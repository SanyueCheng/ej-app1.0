import React from 'react';
import { connect } from 'dva';
class HelpPage extends React.Component {

    render() {
        return (
            <div>
                <h1>this is HelpPage</h1>
            </div>

        );
    }

}

export default connect()(HelpPage);