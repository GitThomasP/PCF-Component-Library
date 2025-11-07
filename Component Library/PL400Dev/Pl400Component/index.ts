import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class Pl400Component
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  //Setup to use propeties gained in the input paramters of init()
  private _notifyOutputChanged: () => void;
  private _mainDiv: HTMLDivElement;
  private _textBox: HTMLTextAreaElement;
  private _label: HTMLLabelElement;
  //

  private _upperCaseOnly: boolean;
  private _button: HTMLButtonElement;
  private _buttonHandler: EventListener;
  private _textBoxHandler: EventListener;
  /**
   * Empty constructor.
   */
  constructor() {
    // Empty
  }

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */

 

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    // Add control initialization code
    this._notifyOutputChanged = notifyOutputChanged;
    this._mainDiv = document.createElement("div");

    //Creates the textbox
    this._textBox = document.createElement("textarea");
    this._textBox.value = context.parameters.textValue.raw || "";
    this._mainDiv.appendChild(this._textBox);
    //Add event listener
    this._textBoxHandler = this.hasTextBoxChanged.bind(this);
    this._textBox.addEventListener("input", this._textBoxHandler);

    //This creates a label
    this._label = document.createElement("label");
    this._mainDiv.appendChild(this._label);

    //Creates a button
    this._button = document.createElement("button");
    this._button.textContent = "Uppercase Switch";
    //Adds onClick event to button
    this._buttonHandler = this.clickHandler.bind(this);
    this._button.addEventListener("click", this._buttonHandler)
    this._mainDiv.appendChild(this._button)

    //Adds everything to the visible container
    container.appendChild(this._mainDiv);
  }

  public hasTextBoxChanged() {
    this._notifyOutputChanged();
  }

   public clickHandler() {
    this._upperCaseOnly = !this._upperCaseOnly;

    this.checkCasing();
    this._notifyOutputChanged();
  };

  public checkCasing() {
    if (this._upperCaseOnly) {
      this._label.innerHTML = "UPPERCASE ONLY";
      this._textBox.value = this._textBox.value.toUpperCase();
    } else if (!this._upperCaseOnly) {
      this._label.innerHTML = "lowercase";
      this._textBox.value = this._textBox.value.toLowerCase();
    }
  }
  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
    //Setup for updating the value dynamically
    this._textBox.value = context.parameters.textValue.raw || "";

    //Not needed, sets value uppercase

    this.checkCasing()

    //Notifies changes
    this._notifyOutputChanged();
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
   */
  public getOutputs(): IOutputs {
    return {
      //Setup to fetch the output
      textValue: this._textBox.value
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
