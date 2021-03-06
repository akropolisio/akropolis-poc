import * as React from "react";
import { numberWithSpaces } from "../../services/DataService";

import "./c-input-range.css";

interface Props {
    max?: number;
    min?: number;
    step?: number;
    value: number | undefined;
    symbol?: string;
    onChange: (value: number) => void;
}

interface State {
    max: number;
    min: number;
    value: number | undefined;
}

export default class InputRangeComponent extends React.Component<Props, State> {
    public readonly state: State = {
        max: 100,
        min: 0,
        value: 0,
    };

    private range: HTMLInputElement;

    constructor(props: any) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    public componentDidMount() {
        const max = this.props.max || 100;
        const min = this.props.min || 0;
        const value = this.props.value || 0;
        this.setState({
            ...this.state,
            max,
            min,
            value,
        });

        if (value !== 0) {
            this.setRangeBackground(value, min, max);
        }
    }

    public render() {
        return (
            <div className="c-input-range">
                <div className="c-input-range__wrapper-value">
                    <span className="c-input-range__symbol">{this.props.symbol}</span>
                    <div className="c-input-range__value-of-range">{numberWithSpaces(this.state.value)}</div>
                </div>
                <input type="range" className="c-input-range__range"
                    ref={(c: HTMLInputElement) => {
                        this.range = c;
                    }} step={this.props.step}
                    max={this.state.max} min={this.state.min} value={this.state.value} onChange={this.onChange} />
            </div>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLInputElement>) {

        if (event.target.value) {
            const min = parseFloat(this.range.min);
            const max = parseFloat(this.range.max);
            const parsedValue = parseFloat(event.target.value) || 0;
            const value = parsedValue > max ? max : (parsedValue < min ? min : parsedValue);

            this.setState({
                ...this.state,
                value,
            });

            this.setRangeBackground(value, min, max);

            this.props.onChange(value);
        } else {
            this.setState({
                ...this.state,
                value: undefined,
            });
        }
    }

    private setRangeBackground(value: number, min: number, max: number) {
        const val = ((value - min) / (max - min)) * 100;
        this.range.style.background = "linear-gradient(to right, #6c64ff, #6c64ff " + val + "%, #e4e4e4 " + val + "%)";
    }
}
