interface ApiCommonResponse {
  readonly result: 'error' | 'success';
}

interface ApiErrorResponse extends ApiCommonResponse {
  readonly result: 'error';
  readonly 'error-type': string;
}

interface ApiSuccessResponse {
  readonly result: 'success';
  readonly provider: 'https://www.exchangerate-api.com';
  readonly documentation: 'https://www.exchangerate-api.com/docs/free';
  readonly terms_of_use: 'https://www.exchangerate-api.com/terms';
  readonly time_last_update_unix: number;
  readonly time_last_update_utc: string;
  readonly time_next_update_unix: number;
  readonly time_next_update_utc: string;
  readonly time_eol_unix: 0 | number;
  readonly base_code: string;
  readonly rates: Record<string, number>;
}

type ApiResponse = ApiErrorResponse | ApiSuccessResponse;

interface Data {
  readonly unixLastUpdate: number;
  readonly unixNextUpdate: number;
  readonly unixEol: number;
  readonly rates: Record<string, number>;
}

export default class {
  private readonly _url = new URL('/v6/latest', 'https://open.er-api.com');
  private _data?: Data;

  isLoading = true;

  lastUpdate = '';
  nextUpdate = '';
  eol = '';
  currencies: Array<string> = [];

  error = '';
  amount = '';
  from = '';
  to = '';
  result = '';

  async init() {
    await this._update();
    this.isLoading = false;
  }

  async reload() {
    this.isLoading = true;
    await this._update();
    this.error = '';
    this.result = '';
    this.isLoading = false;
  }

  swap() {
    if (!this.from && !this.to) {
      return;
    }

    const _2 = this.to;
    this.to = this.from;
    this.from = _2;
  }

  convert() {
    this.error = '';
    this.result = '';

    if (!this.amount || !this.from || !this.to) {
      this.error = 'Missing fields!';
      return;
    }

    if (
      !this.currencies.includes(this.from) ||
      !this.currencies.includes(this.to)
    ) {
      this.error = 'Unsupported currency!';
      return;
    }

    const { rates } = this._data!;
    const ans = ((rates[this.to] / rates[this.from]) * +this.amount).toFixed(2);
    this.result = `${this.amount} ${this.from} = ${ans} ${this.to}`;
  }

  private async _fetch() {
    const res = await fetch(this._url.href);

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = <ApiResponse>await res.json();

    if (data.result === 'error') {
      throw new Error(data['error-type']);
    }

    return <Data>{
      unixLastUpdate: data.time_last_update_unix,
      unixNextUpdate: data.time_next_update_unix,
      unixEol: data.time_eol_unix,
      rates: data.rates,
    };
  }

  private async _update() {
    try {
      this._data = await this._fetch();
      this.lastUpdate = `Last Updated: ${new Date(
        this._data.unixLastUpdate * 1000
      ).toLocaleString()}`;
      this.nextUpdate = `Next Update: ${new Date(
        this._data.unixNextUpdate * 1000
      ).toLocaleString()}`;
      this.eol = `EOL: ${new Date(this._data.unixEol * 1000).toLocaleString()}`;
      this.currencies = Object.keys(this._data.rates);
    } catch (error: any) {
      this.error = error.message;
    }
  }
}
