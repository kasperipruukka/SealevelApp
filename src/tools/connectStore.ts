import { LitElement } from "lit-element";
import { Store, Unsubscribe } from "redux";

type Constructor<T> = new(...args: any[]) => T;

export const connectStore = <U>(store: Store<U>) => <T extends Constructor<LitElement>>(baseElement: T) =>
    class extends baseElement {
        _storeUnsubscribe!: Unsubscribe;

        connectedCallback(): void {
            super.connectedCallback();
            this._storeUnsubscribe = store.subscribe(() => this.stateChanged(store.getState()));
            this.stateChanged(store.getState());
        }

        disconnectedCallback(): void {
            this._storeUnsubscribe();
            super.disconnectedCallback();
        }

        stateChanged(_state: U) {}
    }