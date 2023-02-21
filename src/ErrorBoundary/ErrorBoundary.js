import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            error: null,
            info: null
        };
    };
    
    componentDidMount() {
        window.onerror = (error) => {
            this.setState({ error, info: error.message });
        };
    };
  
    componentDidCatch(error, info) {
        this.setState({ error, info });
    };
  
    render() {
        const h1Styles = {
            color: "white"
        };
        const buttonStyles = {
            color: "white",
            backgroundColor: "rgba(0, 0, 0, .5)",
            border: "none"
        };

        return <>
            {this.state.error && <>
                <h1 style={h1Styles}>Something went terribly wrong!</h1>
                <button style={buttonStyles} onClick={window.location.reload()}>Click to reload</button>
            </>}

            {!this.state.error && this.props.children}
        </>;
    };
};

export default ErrorBoundary;