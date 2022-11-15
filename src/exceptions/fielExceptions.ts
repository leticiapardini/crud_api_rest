import FieldError from "../../dtos/fielErros";

export default class FieldException {
  public errors: FieldError[];
  public statusCode: number = 400;
  
  constructor(errors: FieldError[]) {
    this.errors = errors;
  }
}