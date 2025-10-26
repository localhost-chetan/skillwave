import { Component } from "react";
import { toast } from "sonner";

class ErrorBoundaryWithToast extends Component {
  state = { hasError: false, error: null };

  componentDidCatch(error) {
    this.setState({ hasError: true, error });
    toast.error("Something went wrong", {
      description: error.message || "An unexpected error occurred",
    });
  }

  render() {
    if (this.state.hasError) {
      return <div>Error: {this.state.error?.message || "Unknown error"}</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundaryWithToast;