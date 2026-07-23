const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `                      {!immiResult && !isAssessingImmi ? (
                        <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                          <Plane className="w-12 h-12 text-slate-100" />
                          <p className="text-sm font-bold text-slate-100 uppercase tracking-widest">Select parameters to compute visa eligibility</p>
                        </div>
                      ) : isAssessingImmi ? (`;

const replaceStr = `                      {isAssessingImmi ? (`;

// Also we need to remove the `immiResult && (` wrapping the result, which comes after `) : (`
const targetStr2 = `                      ) : (
                        immiResult && (
                          <motion.div`;
                          
const replaceStr2 = `                      ) : (
                          <motion.div`;

// Also need to remove the closing parenthesis for `immiResult && (`
const targetStr3 = `                            </div>
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>`;

const replaceStr3 = `                            </div>
                          </motion.div>
                      )}
                    </AnimatePresence>`;

code = code.replace(targetStr, replaceStr);
code = code.replace(targetStr2, replaceStr2);
code = code.replace(targetStr3, replaceStr3);

fs.writeFileSync('src/App.tsx', code);
console.log("Removed placeholder");
