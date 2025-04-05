import React from "react";

class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="container">
                <div className="color-picker-container">
                    <input type="color"/>
                </div>

                <div class="board-container">
                    <Board></Board>
                </div>
            </div>
        )
    }
}