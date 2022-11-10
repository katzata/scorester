export default function Form({ fields }) {
    const { type/* , subType, title */ } = fields;
    const fieldElements = {
        checkbox: <input type="checkbox" onChange={handleSubmit} />
    };

    console.log(fields);
    function handleSubmit(e) {
        e.preventDefault();
        console.log(e);
    };

    return fieldElements[type];
};