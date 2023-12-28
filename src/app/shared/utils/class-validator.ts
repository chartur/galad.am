import { AbstractControl } from "@angular/forms";

export class ClassValidator {
  static minLengthValidArray = (min: number) => {
    return (c: AbstractControl): null | {[key: string]: boolean} => {
      if (c.value.filter((val: any) => !!val).length >= min){
        return null;
      }

      return { minLengthValidArray: true};
    }
  }

  static staticLengthValidArray = (length: number) => {
    return (c: AbstractControl): null | {[key: string]: boolean} => {
      if (c.value.filter((val: any) => !!val).length === length){
        return null;
      }

      return { staticLengthValidArray: true};
    }
  }

  static compareFieldValuesOfForm = (source: string, target: string) => {
    return (form: AbstractControl): null | {[key: string]: boolean} => {
      if (form.get(source).value?.trim() === form.get(target).value?.trim()){
        return null;
      }

      return { staticLengthValidArray: true};
    }
  }
}
