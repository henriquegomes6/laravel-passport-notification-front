import cloneDeep from 'lodash/cloneDeep';
import { Component } from 'react';

export interface IStateForm<T extends Object = any> {
  model?: Partial<T>;
}

export abstract class FormComponent<P, S extends IStateForm> extends Component<P, S> {
  protected scrollTop: Function;

  constructor(props: any) {
    super(props);
    this.state = { model: {} } as Readonly<S>;
  }

  public resetForm = () => {
    this.setState({ model: {} });
  }

  protected updateModel = (handler: (model: S['model'], value: any) => void): (value?: any) => void => {
    return (event: any) => {
      const { model } = this.state;

      handler(model, event.target.value);

      this.setState({ model: cloneDeep(model) });
      event.persist();
    };
  }

}