import Swal from "sweetalert2";

class Context {
  /**
   * @type {Strategy} The Context maintains a reference to one of the Strategy
   * objects. The Context does not know the concrete class of a strategy. It
   * should work with all strategies via the Strategy interface.
   */
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  public showModal(): void {
    const result = this.strategy.getModalInfo();
    Swal.fire({
      title: result.title,
      text: result.text,
      confirmButtonText: "Got it!",
      confirmButtonColor: "#0082c9",
    });
  }
}

class Polygon implements Strategy {
  public getModalInfo() {
    return {
      title: "Search by Polygon",
      text: "Search points drawing a polygon over the map, for example, draw a square to select all points inside the block.",
    };
  }
}

class Location implements Strategy {
  public getModalInfo() {
    return {
      title: "Search by Location",
      text: "Enable your location in the browser (desktop or mobile) and select a range of meters which you want to find points",
    };
  }
}

class DirectionsRoute implements Strategy {
  public getModalInfo() {
    return {
      title: "Get directions",
      text: "Please select the point that you prefer bellow and the app will give you the shortest route to the point.",
    };
  }
}

class LocationMaintenance implements Strategy {
  public getModalInfo() {
    return {
      title: "Under construction",
      text: "This feature it's currently under construction, please be pacient.",
    };
  }
}

class Directions implements Strategy {
  public getModalInfo() {
    return {
      title: "Directions",
      text: "Find the directions between your location and the selected point",
    };
  }
}
class Creation implements Strategy {
  public getModalInfo() {
    return {
      title: "Creation",
      text: "Create your own point and add your custom info, but... we haven't implemented a backend :( , so your points will be available just in your session :)",
    };
  }
}

interface Strategy {
  getModalInfo(): {
    title: string;
    text: string;
  };
}

const throwModal = (title: string, text: string) => {
  Swal.fire({
    title,
    text,
    confirmButtonText: "Got it!",
    confirmButtonColor: "#0082c9",
  });
};

export {
  Polygon,
  Location,
  Directions,
  Creation,
  Context,
  throwModal,
  DirectionsRoute,
  LocationMaintenance,
};
