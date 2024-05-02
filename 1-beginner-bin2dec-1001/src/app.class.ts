export default class {
  error = '';
  input = '';
  output = '--';

  convert() {
    this.error = '';
    this.output = '--';

    if (!this.input) {
      return;
    }

    if (!/^[01]+$|^[01]*\.[01]+$/g.test(this.input)) {
      this.error = 'Not a binary number!';
      return;
    }

    const [whole, fraction] = this.input.split('.');
    let ans = 0;

    for (let len = whole.length - 1, i = len; i >= 0; i--) {
      ans += +whole[len - i] * Math.pow(2, i);
    }

    if (fraction) {
      for (let i = 0, len = fraction.length; i < len; i++) {
        ans += +fraction[i] * Math.pow(2, -(i + 1));
      }
    }

    this.output = ans.toString();
  }
}
