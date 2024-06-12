type In = '.' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type Op = '+' | '-' | 'x' | '÷' | '=';

export default class {
  private _calculated = false;
  buffer = <Array<number | Op>>[];
  display = '0';

  action(data: Op) {
    this._reset();
    if (this.display === '0' && !this.buffer.length) {
      return;
    }
    const last = this.buffer[this.buffer.length - 1];
    if (last && typeof last === 'string' && this.display === '0') {
      this.buffer.splice(-1, 1, data);
    } else {
      if (this.buffer.length > 0) {
        const [num1, op] = this.buffer;
        this.buffer = [this._calculate(+num1, +this.display, <Op>op)];
        this.buffer.push(data);
      } else {
        this.buffer.push(+this.display, data);
      }
      this.display = '0';
    }
  }

  backspace() {
    this._reset();
    if (this.display === '0') {
      return;
    }
    if (this.display.length > 1) {
      this.display = this.display.slice(0, -1);
    } else {
      this.display = '0';
    }
  }

  calculate() {
    if (this._calculated) {
      return;
    }
    this._calculated = true;
    if (this.display !== '0') {
      this.buffer.push(+this.display);
    }
    const last = this.buffer[this.buffer.length - 1];
    if (last && typeof last === 'string') {
      this.buffer.pop();
    }
    this.buffer.push('=');
    if (this.buffer.length < 3) {
      this.display = this.buffer[0].toString();
    } else {
      const [num1, op, num2] = this.buffer;
      this.display = this._calculate(+num1, +num2, <Op>op).toString();
    }
  }

  cancel() {
    this.buffer = [];
    this.display = '0';
  }

  type(data: In | Op) {
    this._reset();
    if (this.display === '0' && data !== '.') {
      this.display = data;
    } else {
      this.display += data;
    }
  }

  private _calculate(number1: number, number2: number, operation: Op) {
    if (operation === '+') {
      return number1 + number2;
    }
    if (operation === '-') {
      return number1 - number2;
    }
    if (operation === 'x') {
      return number1 * number2;
    }
    if (operation === '÷') {
      return number1 / number2;
    }
    return NaN;
  }

  private _reset() {
    if (this._calculated) {
      this.cancel();
      this._calculated = false;
    }
  }
}
