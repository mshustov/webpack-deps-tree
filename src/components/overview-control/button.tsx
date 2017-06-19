import * as React from 'react';
import classnames from 'classnames';

import Button from '../button/';
import './button-style.css';

interface OverviewButtonProps {
    disabled: boolean;
    onClick: () => void;
}

const OverviewButton: React.SFC<OverviewButtonProps> = props => {
    const buttonClassname = classnames('module-overview-button', {
        'module-overview-button--disabled': props.disabled
    });

    return (
        <div className={buttonClassname}>
            <Button
                disabled={props.disabled}
                onClick={props.onClick}
            >
                render module overview
            </Button>
        </div>
    );
};

export default OverviewButton;
