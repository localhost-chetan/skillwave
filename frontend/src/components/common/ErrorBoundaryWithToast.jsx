import { Component } from "react";
import { toast } from "sonner";

class ErrorBoundaryWithToast extends Component {
  componentDidCatch(error) {
    toast.error("Something went wrong", {
      description: error.message || "An unexpected error occurred",
    });
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundaryWithToast;