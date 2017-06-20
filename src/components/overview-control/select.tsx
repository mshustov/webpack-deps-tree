import * as React from 'react';
import './select-style.css';

interface OverviewSelectProps {
    active: string;
    groups: {[key: string]: ModuleGroup};
    onChange: (name: string) => void;
}

const OverviewSelect: React.SFC<OverviewSelectProps> = props => (
    <div className="overview-select">
        <select
            className="overview-select__element"
            value={props.active || ''}
            onChange={
                (e: React.SyntheticEvent) => props.onChange((e.target as HTMLOptionElement).value)
            }
        >
            <option key="empty" value="">Select group</option>
            {
                Object.values(props.groups).map(g => 
                    <option key={g.name} value={g.name}>{g.name} {g.size} kB</option>
                )
            }
        </select>
    </div>
);

// const defaultProps: Partial<OverviewSelectProps> = {
//     active: ''
// };
// OverviewSelect.defaultProps = defaultProps;

export default OverviewSelect;
