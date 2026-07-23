const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// For line 3139
const wrongStr = `                            </div>
                          </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
            {/* 📈 PROPRIETARY AI GLOBAL SALARY PREDICTOR */}`;

const fixedStr = `                            </div>
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
            {/* 📈 PROPRIETARY AI GLOBAL SALARY PREDICTOR */}`;

code = code.replace(wrongStr, fixedStr);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed 3139");
