const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  'const [profileCountry, setProfileCountry] = useState<string>("United States");',
  'const [profileCountry, setProfileCountry] = useState<string>("United States");\n  const [availableCountries, setAvailableCountries] = useState<string[]>([]);'
);

const fetchCode = `  useEffect(() => {
    const fetchDropdownCountries = async () => {
      const supabase = getSupabase();
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('countries')
          .select('country_name')
          .order('country_name', { ascending: true });
        
        if (data && !error) {
          setAvailableCountries(data.map(d => d.country_name));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDropdownCountries();
  }, []);

  useEffect(() => {
    fetchCountries();`;

code = code.replace('  useEffect(() => {\n    fetchCountries();', fetchCode);

fs.writeFileSync('src/App.tsx', code);
console.log("Updated state and useEffect");
