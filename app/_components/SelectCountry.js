import { getCountries } from '@/app/_lib/data-service';

// Let's imagine your colleague already built this component 😃

async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getCountries();
  const selectedCountry = countries.find(
    (country) => country.name.toLowerCase() === defaultCountry?.toLowerCase()
  );
  const flag = selectedCountry?.flag ?? '';
  const selectedCountryName = selectedCountry?.name ?? defaultCountry;

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${selectedCountryName}%${flag}`}
      className={className}
    >
      <option value=''>Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;