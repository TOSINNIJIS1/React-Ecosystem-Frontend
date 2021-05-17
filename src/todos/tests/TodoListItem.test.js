import { expect } from 'chai';
import { getBorderStyledForDate } from '../TodoListItem';


describe('getBorderStyledForDate', () => {
    it ('returned none when data is less than five days ago', () => {
        const today = Date.now();
        const recentDate = new Date(Date.now() - 86400000 * 3);

        const expected = 'none';
        const actual = getBorderStyledForDate(recentDate, today);

        expect(actual).to.equal(expected);
    });


    it ('returned a border when the date is more than five days ago', () => {
        const today = Date.now();
        const recentDate = new Date(Date.now() - 86400000 * 7);

        const expected = '2px solid red';
        const actual = getBorderStyledForDate(recentDate, today);

        expect(actual).to.equal(expected)
    })
})

