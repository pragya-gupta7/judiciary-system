const { faker } = require("@faker-js/faker");

// entering 100 fake data
const seed = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    const def_name = faker.person.fullName();
    const def_addr = faker.location.streetAddress(false);
    const crime_type = faker.helpers.arrayElement([
      "Theft",
      "Rape",
      "Murder",
      "Molestation",
      "Eve teasing",
    ]);
    const crime_date = faker.date.past();

    const crime_location = faker.location.streetAddress(true);
    const ao_name = faker.person.fullName();
    const arrest_date = faker.date.between({ from: crime_date });
    const judge_name = faker.person.fullName();
    const lawyer_name = faker.person.fullName();
    const prosecutor_name = faker.person.fullName();
    const start_date = faker.date.between({ from: arrest_date });
    const end_date = faker.date.between({ from: start_date });
    const status = faker.word.words(10);
    const cin = i + 2;
    const next_hearing = {
      date: faker.date.between({ from: start_date }),
      slot: faker.helpers.arrayElement([1, 2]),
    };

    data.push({
      def_name,
      def_addr,
      crime_type,
      crime_date,
      crime_location,
      ao_name,
      arrest_date,
      judge_name,
      lawyer_name,
      prosecutor_name,
      start_date,
      end_date,
      status,
      cin,
      next_hearing,
    });
  }
  return data;
};

module.exports = seed;