export class Place {
    constructor(text, parts, messages) {
        this._data = {
            count: 0,
            country: parts.length > 0 ? parts.pop() : '',
            locale: parts.length > 0 ? parts.join(', ') : '',
            messages: messages,
            standard: parts.join(','),
            state: parts.length > 0 ? parts.pop() : '',
            text: text
        }
    }

    count() { return this._data.count }
    country() { return this._data.country }
    standard() { return this._data.standard }
    locale() { return this._data.locale }
    messages() { return this._data.messages }
    state() { return this._data.state }
    text() { return this._data.text }

    increment() { this._data.count++ }
}
