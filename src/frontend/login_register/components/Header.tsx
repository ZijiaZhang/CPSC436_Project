import React from "react";

export class Header extends React.Component<{}, {}>{
    render(): React.ReactElement{
        return (
            <header>
                <h1 id="tittle" className="header">
            UBC TANTAN
        </h1>
        </header>
        )
    }
}