const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target = "    } else {\n      setSavedReports([]);\n    }\n    const handleSaveReport = async () => {\n    const activeUser = user;\n    if (!activeUser) {\n      triggerNotification(\"Please request private access to save reports.\");\n      return;\n    }\n    if (!compareA || !compareB) {\n      triggerNotification(\"Please select two jurisdictions to compare first.\");\n      return;\n    }\n    setIsSaving(true);\n    setTimeout(() => {\n      triggerNotification(\"Strategic Intelligence Saved to Archives.\");\n      fetchSavedReports(activeUser);\n      setIsSaving(false);\n    }, 600);\n  };);\n    }\n  };";

const replacement = "    } else {\n      setSavedReports([]);\n    }\n  }, [user]);\n\n  const handleSaveReport = async () => {\n    const activeUser = user;\n    if (!activeUser) {\n      triggerNotification(\"Please request private access to save reports.\");\n      return;\n    }\n    if (!compareA || !compareB) {\n      triggerNotification(\"Please select two jurisdictions to compare first.\");\n      return;\n    }\n    setIsSaving(true);\n    setTimeout(() => {\n      triggerNotification(\"Strategic Intelligence Saved to Archives.\");\n      fetchSavedReports(activeUser);\n      setIsSaving(false);\n    }, 600);\n  };";

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Fixed target!");
} else {
  console.log("Target not found");
}
