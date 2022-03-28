type TVRMListItemForm<T> = {
  [K in keyof T]: {
    value: T[K] | string;
    textMaxLength?: number;
    validator?(): boolean;
  };
};
class VRMListItemFormBase<T, TItem = Omit<T, "id">> {
  item: TVRMListItemForm<TItem>;
  id = "";
  constructor(item: TVRMListItemForm<TItem>) {
    this.item = item;
  }
  get isEditMode() {
    return this.id != "";
  }
  get get(): T {
    if (!this.id)
      this.id =
        "crypto" in self
          ? crypto.randomUUID()
          : Math.floor(Math.random() * 1000000).toString(); //fallback for browsers without crypto

    //could also be done with reduce
    const objectValues = Object.keys(this.item).map((k) => [
      k,
      this.item[k as keyof TItem].value,
    ]);
    return Object.fromEntries([...objectValues, ["id", this.id]]);
  }

  assign(item: TItem & { id?: string }): void {
    for (const key in item) {
      if (key == "id") this.id = item.id ?? "";
      else this.item[key as keyof TItem].value = item[key as keyof TItem];
    }
  }

  clear(): void {
    for (const key in this.item) this.item[key as keyof TItem].value = "";
    this.id = "";
  }

  validate(): boolean {
    return Object.keys(this.item).every((key) =>
      this.item[key as keyof TItem].validator?.()
    );
  }
}

export interface IVRMListItem {
  id?: string;
  title: string;
  text: string;
  date: string;
}
export class VRMListItemForm extends VRMListItemFormBase<IVRMListItem> {
  constructor(/* item: TVRMListItemForm<IVRMListItem> */) {
    super({
      title: {
        value: "",
        textMaxLength: 100,
        validator() {
          return (
            this.value.length > 0 &&
            typeof this.textMaxLength == "number" &&
            this.value.length <= this.textMaxLength
          );
        },
      },
      text: {
        value: "",
        textMaxLength: 300,
        validator() {
          return (
            this.value.length > 0 &&
            typeof this.textMaxLength == "number" &&
            this.value.length <= this.textMaxLength
          );
        },
      },
      date: {
        value: "",
        validator() {
          return this.value.length > 0;
        },
      },
    });
  }
}
