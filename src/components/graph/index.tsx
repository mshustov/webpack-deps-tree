import * as React from 'react';
import Input from '../input';
// ok ,here we want to render 2 differnet graphs, get back to problem later
import { bootstrap } from '../../graph/index';
import './graph-style.css';

interface GraphProps {
    nodes: ModuleNode[];
    edges: ModuleEdge[];

    activeModuleId: ModuleId;
    isModuleOverview: boolean;
}
interface GraphState {
    filter: string;
}

export default class Graph extends React.Component<GraphProps, GraphState> {
    private graphElem: HTMLElement;
    private updateData: (props: GraphProps) => void;
    private updateFilter: (str: string, isModuleOverview: boolean) => void;

    constructor(props: GraphProps) {
        super(props);
        this.state = {
            filter: ''
        };

        this.onFilterChange = this.onFilterChange.bind(this);
    }

    componentDidMount() {
        const { updateData, updateFilter } = bootstrap(this.graphElem);
        this.updateData = updateData;
        this.updateFilter = updateFilter;
        this.updateData(this.props);
    }

    componentWillReceiveProps(nextProps: GraphProps) {
        this.updateData(nextProps);
        this.setState(s => ({
            filter: ''
        }));
    }

    onFilterChange(filterValue: string) {
        this.setState(s => ({
            filter: filterValue
        }));

        this.updateFilter(filterValue, this.props.isModuleOverview);
    }

    render() {

        return (
            <div className="graph" ref={(r) => this.graphElem = r} >
                <div className="graph__settings">
                    <div className="graph__filter">
                        <Input
                            placeholder="Filter by group name"
                            onChange={this.onFilterChange}
                            value={this.state.filter}
                        />
                    </div>
                    <div className="graph__controls">
                    {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
