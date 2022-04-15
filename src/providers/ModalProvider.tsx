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
      text: "Do you want to continue",
      confirmButtonText: "Cool",
    });
  }
}

class Polygon implements Strategy {
  public getModalInfo() {
    return {
      title: "Search by Polygon",
      description: "Search points drawing a polygon ",
    };
  }
}

class Location implements Strategy {
  public getModalInfo() {
    return {};
  }
}

class Directions implements Strategy {
  public getModalInfo() {
    return {};
  }
}
class Creation implements Strategy {
  public getModalInfo() {
    return {};
  }
}

interface Strategy {
  getModalInfo(): any;
}

export { Polygon, Location, Directions, Creation, Context };
