const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target = `  const handleAdminUpsert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    
    setIsUpserting(true);
    setTimeout(() => {
      alert("Matrix Overridden Successfully! (Simulated)");
      triggerNotification("Jurisdiction Matrix Successfully Synchronized.");
      
      // Immediate Live State Refresh
      fetchCountries();
      
      setIsAdminPanelOpen(false);
      resetAdminForm();
      setIsUpserting(false);
    }, 600);
  };`;

const replacement = `  const handleAdminUpsert = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase || !isAdmin) return;

    try {
      setIsUpserting(true);
      const cleanName = adminCountryName.trim();
      const existingRef = countries.find(c => c.country_name?.toLowerCase() === cleanName.toLowerCase());

      const payload = {
        country_name: cleanName,
        average_salary_usd: adminSalary || existingRef?.average_salary_usd || 0,
        tax_rate_percent: adminTax || existingRef?.tax_rate_percent || 0,
        annual_growth: adminAnnualGrowth || existingRef?.annual_growth || "+0.0%",
        stability_score: adminStabilityScore || existingRef?.stability_score || "Stable",
        monthly_rent: adminRent || existingRef?.rent || "",
        healthcare: adminHealthcare || existingRef?.healthcare || "",
        compass_index: adminCompassIndex || existingRef?.compass_index || 50,
        strategic_status: adminStrategicStatus || existingRef?.strategic_status || "Neutral",
        safety: adminSafety || existingRef?.safety || "",
        internet: adminInternet || existingRef?.internet || "",
        cost_of_living_score: adminCostOfLiving || existingRef?.cost_of_living_score || 70
      };

      const { error } = await supabase
        .from('countries')
        .upsert([payload], { onConflict: 'country_name' });

      if (error) throw error;
      
      alert("Jurisdiction data overridden successfully!");
      triggerNotification("Jurisdiction Matrix Successfully Synchronized.");
      
      fetchCountries();
      setIsAdminPanelOpen(false);
      resetAdminForm();
    } catch (err: any) {
      console.error(err);
      alert("Database Error: " + (err.message || "Unknown synchronization failure."));
      triggerNotification(err.message || "Matrix Synchronization Failure.");
    } finally {
      setIsUpserting(false);
    }
  };`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Fixed!");
} else {
  console.log("Target not found");
}
