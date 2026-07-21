const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target2 = `    } else {
      setSavedReports([]);
    }
    const handleSaveReport = async () => {
    const activeUser = user;
    if (!activeUser) {
      triggerNotification("Please request private access to save reports.");
      return;
    }
    if (!compareA || !compareB) {
      triggerNotification("Please select two jurisdictions to compare first.");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      triggerNotification("Strategic Intelligence Saved to Archives.");
      fetchSavedReports(activeUser);
      setIsSaving(false);
    }, 600);
  };);
    }
  };

  const loadSavedReport = (report: any) => {`;

const replacement = `    } else {
      setSavedReports([]);
    }
  }, [user]);

  const handleSaveReport = async () => {
    const activeUser = user;
    if (!activeUser) {
      triggerNotification("Please request private access to save reports.");
      return;
    }
    if (!compareA || !compareB) {
      triggerNotification("Please select two jurisdictions to compare first.");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      triggerNotification("Strategic Intelligence Saved to Archives.");
      fetchSavedReports(activeUser);
      setIsSaving(false);
    }, 600);
  };

  const loadSavedReport = (report: any) => {`;

if (code.includes(target2)) {
  code = code.replace(target2, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Fixed target 2");
} else {
  console.log("Target not found");
}
