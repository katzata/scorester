import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            error: null,
            info: null
        };
    };
  
    componentDidCatch(error, info) {
      this.setState({ error, info });
    };
  
    render() {
        if (this.state.hasError) {
            const buttonStyles = {
                color: "white",
                backgroundColor: "rgba(0, 0, 0, .5)",
                border: "none"
            };

            return <>
                <h1>Something went terribly wrong!</h1>
                <button style={buttonStyles} onClick={window.location.reload()}>Click to reload</button>
            </>;
        };

        return this.props.children;
    };
};

export default ErrorBoundary;