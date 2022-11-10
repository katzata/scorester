
export default function Select({ options }) {
    return <select>
        {options && options.map(el => {
            return <option value={el.value} key={el.title}>{el.title}</option>
        })}
    </select>
};