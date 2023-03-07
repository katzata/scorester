import React from "react";
import styles from "./ErrorBoundary.module.scss"

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.children = props.children;
        this.state = { hasError: false };
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    };

    handleReload() {
        window.localStorage.clear();
        window.location.reload()
    };

    componentDidMount() {
        window.onerror = (error, errorInfo) => {
            console.warn(error, errorInfo);
            this.setState({ hasError: true });
        };
    };

    componentDidCatch(error, errorInfo) {
        console.warn(error, errorInfo);
        this.setState({ hasError: true });
    };

    render() {
        if (this.state.hasError) {
            return <div className={styles.errorBoundary}>
                <h1>Something went terribly wrong!</h1>
                <button onClick={this.handleReload}>Reload the application</button>
            </div>;
        };

        return this.props.children;
    };
};

export default ErrorBoundary;