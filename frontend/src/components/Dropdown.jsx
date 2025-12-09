export default function Dropdown({ options, value, onChange }) {

    return (
        <select name="tags" id="tags" value={value} onChange={(e) => {
            const selected = options.find(opt => opt.value === e.target.value);
            onChange(selected);
        }} className="p-3 border rounded-lg outline-none mt-5 md:mt-0 w-full md:w-lg">
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    )
}