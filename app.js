// =========================================================================
// API key is no longer needed in app.js as we revert to API simulation.
// =========================================================================

// --- Define WelcomeScreen component ---
const WelcomeScreen = {
    emits: ['navigate'],
    template: `
        <div class="screen welcome-screen">
            <img src="logo.png" alt="Mindsurance Logo" class="logo">
            <h1>Unlock Your Cognitive Potential</h1>
            <p>Mindsurance is an innovative system for identifying, analyzing, registering, and insuring human cognitive potential, using AI, neuro-interfaces, and predictive models.</p>
            <button @click="$emit('navigate', 'dataInput')">Start Assessment</button>
            <button class="secondary-btn" @click="learnMore">Learn More</button>
        </div>
    `,
    methods: {
        learnMore() {
            alert("Mindsurance protects your creative and intellectual assets even before physical manifestation.");
        }
    }
};

// --- Define DataInputScreen component ---
const DataInputScreen = {
    emits: ['navigate'],
    template: `
        <div class="screen data-input-screen">
            <h2>Simulate Cognitive Data Input</h2>
            <p>Please provide simulated data to assess your cognitive potential.</p>

            <div class="input-section">
                <h3>1. Brainwave Signals (EEG/BCI Simulation)</h3>
                <div class="form-group">
                    <label for="brainwaveQuality">Select Simulated Brainwave Quality:</label>
                    <select id="brainwaveQuality" v-model="formData.brainwaveQuality">
                        <option value="High">High Activity / Focus</option>
                        <option value="Medium">Medium Activity / Balanced</option>
                        <option value="Low">Low Activity / Relaxed</option>
                    </select>
                </div>
            </div>

            <div class="input-section">
                <h3>2. Cognitive Test Results</h3>
                <div class="form-group">
                    <label for="creativityScore">Creativity Test Score (%):</label>
                    <input type="number" id="creativityScore" v-model.number="formData.creativityScore" min="0" max="100">
                </div>
                <div class="form-group">
                    <label for="abstractThinkingScore">Abstract Thinking Score (%):</label>
                    <input type="number" id="abstractThinkingScore" v-model.number="formData.abstractThinkingScore" min="0" max="100">
                </div>
                <div class="form-group">
                    <label for="problemSolvingSpeed">Problem Solving Speed:</label>
                    <select id="problemSolvingSpeed" v-model="formData.problemSolvingSpeed">
                        <option value="Fast">Fast</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Slow">Slow</option>
                    </select>
                </div>
            </div>

            <div class="input-section">
                <h3>3. AI Dialog & Reflective Journals</h3>
                <div class="form-group">
                    <label for="aiDialogSummary">Summarize insights from your AI-guided reflective sessions:</label>
                    <textarea id="aiDialogSummary" v-model="formData.aiDialogSummary" rows="4" placeholder="e.g., 'Explored novel solutions to complex problems', 'Demonstrated high adaptability...'"></textarea>
                </div>
            </div>

            <button @click="proceedToAnalysis">Proceed to Analysis</button>
        </div>
    `,
    data() {
        return {
            formData: {
                brainwaveQuality: 'Medium',
                creativityScore: 75,
                abstractThinkingScore: 70,
                problemSolvingSpeed: 'Moderate',
                aiDialogSummary: 'Explored various ideas and concepts with good clarity.'
            }
        };
    },
    methods: {
        proceedToAnalysis() {
            this.$emit('navigate', 'aiAnalysis', this.formData);
        }
    }
};

// --- Define AiAnalysisScreen component ---
const AiAnalysisScreen = {
    props: ['initialData'],
    emits: ['navigate'],
    template: `
        <div class="screen ai-analysis-screen">
            <h2>Your Cognitive Potential Analysis</h2>

            <div class="cps-display">
                <span class="cps-score">{{ calculatedResults.cps }}</span><span class="cps-max">/100</span>
                <p class="cps-feedback" :class="cpsFeedbackClass">{{ cpsFeedbackText }}</p>
            </div>

            <h3>Key Cognitive Parameters</h3>
            <div class="parameters-grid">
                <div class="parameter-item">
                    <span class="parameter-name">Cognitive Diversity</span>
                    <div class="parameter-bar"><div class="bar-fill" :style="{ width: calculatedResults.parameters.cognitive_diversity + '%' }"></div></div>
                    <span class="parameter-value">{{ calculatedResults.parameters.cognitive_diversity }}%</span>
                </div>
                <div class="parameter-item">
                    <span class="parameter-name">Abstract Thinking</span>
                    <div class="parameter-bar"><div class="bar-fill" :style="{ width: calculatedResults.parameters.abstract_thinking + '%' }"></div></div>
                    <span class="parameter-value">{{ calculatedResults.parameters.abstract_thinking }}%</span>
                </div>
                <div class="parameter-item">
                    <span class="parameter-name">Adaptive Responsiveness</span>
                    <div class="parameter-bar"><div class="bar-fill" :style="{ width: calculatedResults.parameters.adaptive_responsiveness + '%' }"></div></div>
                    <span class="parameter-value">{{ calculatedResults.parameters.adaptive_responsiveness }}%</span>
                </div>
                <div class="parameter-item">
                    <span class="parameter-name">Predictive Capability for Future Ideas</span>
                    <div class="parameter-bar"><div class="bar-fill" :style="{ width: calculatedResults.parameters.predictive_capability + '%' }"></div></div>
                    <span class="parameter-value">{{ calculatedResults.parameters.predictive_capability }}%</span>
                </div>
            </div>

            <p class="summary-text">{{ analysisSummary }}</p>

            <button @click="proceedToGeoRiskAssessment" :disabled="!canRegister">
                {{ canRegister ? 'Proceed to Risk Assessment' : 'Threshold Not Met for Registration' }}
            </button>
        </div>
    `,
    data() {
        return {
            analysisThreshold: 65
        };
    },
    computed: {
        calculatedResults() {
            const data = this.initialData;
            if (!data) {
                return {
                    cps: 0,
                    parameters: { cognitive_diversity: 0, abstract_thinking: 0, adaptive_responsiveness: 0, predictive_capability: 0 }
                };
            }
            const brainwaveVal = { 'High': 90, 'Medium': 70, 'Low': 50 }[data.brainwaveQuality] || 70;
            const problemSolvingVal = { 'Fast': 90, 'Moderate': 70, 'Slow': 50 }[data.problemSolvingSpeed] || 70;
            let aiDialogInsightVal = 70;
            if (data.aiDialogSummary && (data.aiDialogSummary.toLowerCase().includes('novel solutions') || data.aiDialogSummary.toLowerCase().includes('good clarity'))) {
                aiDialogInsightVal = 85;
            } else if (data.aiDialogSummary && (data.aiDialogSummary.toLowerCase().includes('complex problems') || data.aiDialogSummary.toLowerCase().includes('adaptability'))) {
                aiDialogInsightVal = 80;
            }
            const creativityScore = Number(data.creativityScore) || 0;
            const abstractThinkingScore = Number(data.abstractThinkingScore) || 0;
            let cps = (
                brainwaveVal * 0.25 +
                creativityScore * 0.25 +
                abstractThinkingScore * 0.2 +
                problemSolvingVal * 0.15 +
                aiDialogInsightVal * 0.15
            );
            cps = Math.round(Math.min(100, Math.max(0, cps)));
            const cognitiveDiversity = Math.round((creativityScore + aiDialogInsightVal) / 2 + (brainwaveVal - 50) / 4);
            const abstractThinking = Math.round(abstractThinkingScore + (problemSolvingVal - 70) / 10);
            const adaptiveResponsiveness = Math.round((brainwaveVal + problemSolvingVal) / 2);
            const predictiveCapability = Math.round((creativityScore + aiDialogInsightVal + problemSolvingVal) / 3);

            return {
                cps: cps,
                parameters: {
                    cognitive_diversity: Math.min(100, Math.max(0, cognitiveDiversity)),
                    abstract_thinking: Math.min(100, Math.max(0, abstractThinking)),
                    adaptive_responsiveness: Math.min(100, Math.max(0, adaptiveResponsiveness)),
                    predictive_capability: Math.min(100, Math.max(0, predictiveCapability))
                }
            };
        },
        canRegister() {
            return this.calculatedResults.cps >= this.analysisThreshold;
        },
        cpsFeedbackText() {
            const cps = this.calculatedResults.cps;
            if (cps >= 90) return "Outstanding! Your cognitive potential is truly exceptional.";
            if (cps >= 75) return "Excellent! A strong and innovative cognitive profile.";
            if (cps >= 60) return "Good. Solid cognitive capabilities with room for growth.";
            return "Developing. Continue to cultivate your cognitive strengths.";
        },
        cpsFeedbackClass() {
            const cps = this.calculatedResults.cps;
            if (cps >= 90) return 'outstanding';
            if (cps >= 75) return 'excellent';
            if (cps >= 60) return 'good';
            return 'developing';
        },
        analysisSummary() {
            const p = this.calculatedResults.parameters;
            return `Your unique cognitive profile demonstrates high strength in Cognitive Diversity (${p.cognitive_diversity}%) and Abstract Thinking (${p.abstract_thinking}%). Your Adaptive Responsiveness (${p.adaptive_responsiveness}%) is solid, indicating good adaptability. Your Predictive Capability for Future Ideas (${p.predictive_capability}%) suggests a promising potential for innovative output.`;
        }
    },
    methods: {
        proceedToGeoRiskAssessment() {
            if (this.canRegister) {
                this.$emit('navigate', 'geographicalRiskAssessment', this.calculatedResults);
            } else {
                alert('Your Cognitive Potential Score is below the threshold for registration.');
            }
        }
    }
};


// --- Define GeographicalRiskAssessmentScreen component (REVERTED TO SIMULATION) ---
const GeographicalRiskAssessmentScreen = {
    props: ['initialData'], // Receives calculatedResults from AiAnalysisScreen
    emits: ['navigate'],
    template: `
        <div class="screen geo-risk-screen">
            <h2>Geographical Risk Assessment</h2>
            <p>Mindsurance utilizes the **Google Maps Platform** for advanced location-based risk assessment, which may influence your insurance underwriting. This helps identify regional factors affecting cognitive asset protection and intellectual property risk.</p>

            <div class="input-section">
                <h3>Your Location Data (Conceptually via Google Geocoding API)</h3>
                <div class="form-group">
                    <label for="cityRegion">Enter City/Region:</label>
                    <input type="text" id="cityRegion" v-model="cityRegionInput" placeholder="e.g., San Francisco, New York, Rural Iowa">
                </div>
                <button @click="lookupGeographicRisk" :disabled="!cityRegionInput">
                    Analyze Location Risk (Simulated)
                </button>
                <p class="explanation-note">
                    <small>Behind the scenes, Mindsurance **would use Google Geocoding API** to resolve this location and feed it into our risk models for insurance underwriting.</small>
                </p>
            </div>

            <div v-if="geographicRiskFactor" class="risk-summary">
                <h3>Assessment Result:</h3>
                <p>Location: <strong>{{ resolvedLocation }}</strong></p>
                <p class="risk-factor">Associated Geographic Risk Factor: <span :class="riskFactorClass">{{ geographicRiskFactor.label }}</span></p>
                <p class="risk-influence">
                    <template v-if="geographicRiskFactor.value === 'low'">This region's favorable conditions (e.g., strong IP laws, high R&D investment) contribute to a lower cognitive asset risk.</template>
                    <template v-else-if="geographicRiskFactor.value === 'medium'">This region presents moderate environmental factors impacting cognitive assets or IP protection challenges.</template>
                    <template v-else-if="geographicRiskFactor.value === 'high'">This region presents elevated risk factors (e.g., high IP theft rates, environmental stressors) that may affect cognitive asset security or health.</template>
                    <template v-else>This region has an neutral impact on your cognitive asset risk.</template>
                </p>
            </div>

            <button @click="proceedToRegistration" :disabled="!geographicRiskFactor">Proceed to Registration</button>
        </div>
    `,
    data() {
        return {
            cityRegionInput: 'San Francisco', // Default value for easier demo
            geographicRiskFactor: null,     // Stores { label: 'High', value: 'high' }
            resolvedLocation: '',           // Stores the resolved full location name from simulation
        };
    },
    created() {
        // Trigger initial lookup on load if default cityRegionInput is set
        if (this.cityRegionInput) {
            this.lookupGeographicRisk();
        }
    },
    methods: {
        lookupGeographicRisk() {
            // Simulated Geocoding API call
            this.resolvedLocation = this.cityRegionInput; // The resolved location is simply the input for simulation
            const lowerCaseInput = this.cityRegionInput.toLowerCase();

            if (lowerCaseInput.includes('san francisco') || lowerCaseInput.includes('london') || lowerCaseInput.includes('tokyo') || lowerCaseInput.includes('berlin')) {
                this.geographicRiskFactor = { label: 'Low', value: 'low' };
            } else if (lowerCaseInput.includes('new york') || lowerCaseInput.includes('shanghai') || lowerCaseInput.includes('paris')) {
                this.geographicRiskFactor = { label: 'Medium', value: 'medium' };
            } else if (lowerCaseInput.includes('rural') || lowerCaseInput.includes('desert') || lowerCaseInput.includes('jungle') || lowerCaseInput.includes('isolated') || lowerCaseInput.includes('siberia') || lowerCaseInput.includes('conflict')) {
                this.geographicRiskFactor = { label: 'High', value: 'high' };
            } else {
                this.geographicRiskFactor = { label: 'Neutral', value: 'neutral' }; // Default if not matched
            }
            console.log('Simulated Geographic Risk:', this.geographicRiskFactor);
        },
        proceedToRegistration() {
            const dataForNextScreen = {
                calculatedResults: this.initialData, // This is the object with cps and parameters from AiAnalysis
                geographicRiskFactor: this.geographicRiskFactor.value // Pass only the value ('low', 'medium', 'high')
            };
            this.$emit('navigate', 'blockchainRegistration', dataForNextScreen);
        }
    },
    computed: {
        riskFactorClass() {
            if (!this.geographicRiskFactor) return '';
            return `risk-${this.geographicRiskFactor.value}`;
        }
    }
};


// --- Define BlockchainRegistrationScreen component (already adapted for data structure, now no API key to consider) ---
const BlockchainRegistrationScreen = {
    props: ['initialData'], // This now receives { calculatedResults, geographicRiskFactor }
    emits: ['navigate'],
    template: `
        <div class="screen blockchain-screen">
            <h2>Cognitive Potential Registered on Blockchain!</h2>
            <p>Your unique mental pattern has been securely and immutably recorded.</p>

            <div class="registration-details">
                <div class="detail-item">
                    <strong>Registered User ID:</strong> <span>{{ userId }}</span>
                </div>
                <div class="detail-item">
                    <strong>Registration Date/Time:</strong> <span>{{ registrationDateTime }} UTC</span>
                </div>
                <div class="detail-item transaction-hash">
                    <strong>Blockchain Transaction Hash:</strong> <span>{{ transactionHash }}</span>
                </div>
                <div class="detail-item">
                    <strong>Registered CPS:</strong> <span>{{ initialData.calculatedResults.cps }}/100</span>
                </div>
                 <div class="detail-item">
                    <strong>Geographic Risk Factor:</strong> <span>{{ capitalizeFirstLetter(initialData.geographicRiskFactor) }}</span>
                </div>
            </div>

            <div class="digital-certificate">
                <h3>Your Digital Cognitive Certificate</h3>
                <p class="certificate-text">This certifies the immutable registration of your cognitive potential.</p>
                <div class="certificate-info">
                    <span><strong>Mindsurance ID:</strong> {{ userId }}</span>
                    <span><strong>CPS:</strong> {{ initialData.calculatedResults.cps }}/100</span>
                    <span><strong>Recorded:</strong> {{ registrationDateShort }}</span>
                </div>
                <div class="certificate-logo">Mindsurance Certificate</div>
                <p class="certificate-footer">Providing legal & financial protection for your cognitive assets.</p>
            </div>

            <button @click="$emit('navigate', 'cognitiveInsurance', initialData)">Explore Insurance Options</button>
        </div>
    `,
    data() {
        return {
            userId: '',
            registrationDateTime: '',
            transactionHash: '',
            registrationDateShort: '' // For the simplified cert
        };
    },
    created() {
        this.generateRegistrationDetails();
    },
    methods: {
        generateRegistrationDetails() {
            this.userId = 'USR' + Math.random().toString(36).substring(2, 12).toUpperCase();
            const now = new Date();
            this.registrationDateTime = now.toISOString().replace('T', ' ').substring(0, 19);
            this.registrationDateShort = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            this.transactionHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        },
        capitalizeFirstLetter(string) {
            if (typeof string !== 'string' || string.length === 0) return '';
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
};


// --- Define CognitiveInsurancePolicySelectionScreen component (uses geo risk factor) ---
const CognitiveInsurancePolicySelectionScreen = {
    props: ['initialData'], // Now receives { calculatedResults, geographicRiskFactor }
    emits: ['navigate'],
    template: `
        <div class="screen insurance-selection-screen">
            <h2>Protect Your Future Ideas with Mindsurance!</h2>
            <p>Select the risks you wish to insure your cognitive potential against.</p>

            <div class="input-section policy-risks">
                <h3>Select Coverage Risks</h3>
                <div class="form-group checkbox-group">
                    <label>
                        <input type="checkbox" v-model="selectedRisks" value="loss_of_faculties">
                        Loss of Mental Faculties (accidents, illness)
                    </label>
                    <p class="risk-description">Covers potential decline in cognitive abilities due to unforeseen events like accidents or serious illness.</p>
                </div>
                <div class="form-group checkbox-group">
                    <label>
                        <input type="checkbox" v-model="selectedRisks" value="unauthorized_use">
                        Unauthorized Use or Reproduction of Early Ideas
                    </label>
                    <p class="risk-description">Protects against the theft or misuse of your undeveloped, registered cognitive outputs before physical manifestation.</p>
                        </div>
                    <div class="form-group checkbox-group">
                        <label>
                            <input type="checkbox" v-model="selectedRisks" value="delayed_realization">
                            Delay in Realization or Suppression of Inventive Output
                        </label>
                        <p class="risk-description">Provides compensation if the progression of your ideas to fruition is significantly hampered or intentionally suppressed.</p>
                    </div>
                </div>

                <div class="insurance-summary">
                    <h3>Policy Underwriting Summary</h3>
                    <p class="summary-text">
                        Based on your Registered CPS of <strong>{{ initialData.calculatedResults.cps }}/100</strong> and
                        <span :class="geoRiskClass">Geographic Risk of {{ capitalizeFirstLetter(initialData.geographicRiskFactor) }}</span>,
                        and selected risks, your estimated annual premium is:
                    </p>
                    <div class="premium-display">
                        <span class="premium-value">{{ estimatedPremium }}</span> USD / year
                    </div>
                    <p v-if="selectedRisks.length === 0" class="select-risks-prompt">Please select at least one risk to get an estimate.</p>
                </div>

                <button @click="generateSamplePolicy" :disabled="selectedRisks.length === 0">Generate Sample Policy</button>
            </div>
        `,
    data() {
        return {
            selectedRisks: [] // Array to hold selected risk values
        };
    },
    computed: {
        estimatedPremium() {
            if (this.selectedRisks.length === 0 || !this.initialData || typeof this.initialData.calculatedResults.cps === 'undefined') {
                return 'N/A';
            }

            const basePremium = 1000;
            const cps = this.initialData.calculatedResults.cps;
            const cpsInfluence = (100 - cps) / 100;
            const riskFactorMultiplier = this.selectedRisks.length * 0.25;

            let geoRiskMultiplier = 1.0;
            if (this.initialData.geographicRiskFactor === 'low') geoRiskMultiplier = 0.8; // Lower premium
            else if (this.initialData.geographicRiskFactor === 'high') geoRiskMultiplier = 1.5; // Higher premium
            // 'medium' and 'neutral' have multiplier 1.0

            let premium = basePremium * (1 + cpsInfluence) * (1 + riskFactorMultiplier) * geoRiskMultiplier;

            if (this.selectedRisks.includes('loss_of_faculties')) premium += 500;
            if (this.selectedRisks.includes('unauthorized_use')) premium += 750;
            if (this.selectedRisks.includes('delayed_realization')) premium += 400;

            return Math.round(premium).toLocaleString('en-US');
        },
        geoRiskClass() {
            if (!this.initialData || !this.initialData.geographicRiskFactor) return '';
            return `risk-${this.initialData.geographicRiskFactor}`;
        }
    },
    methods: {
        capitalizeFirstLetter(string) { // Helper for display
            if (typeof string !== 'string' || string.length === 0) return '';
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        generateSamplePolicy() {
            const policyDetails = {
                cps: this.initialData.calculatedResults.cps,
                selectedRisks: this.selectedRisks,
                estimatedPremium: this.estimatedPremium,
                geographicRiskFactor: this.initialData.geographicRiskFactor // Pass geographic factor to final screen too
            };
            this.$emit('navigate', 'samplePolicy', policyDetails);
        }
    }
};

// --- Define SamplePolicyScreen component (uses geo risk factor) ---
const SamplePolicyScreen = {
    props: ['initialData'], // This now receives policyDetails including geographicRiskFactor
    emits: ['navigate'],
    template: `
        <div class="screen sample-policy-screen">
            <h2>Your Mindsurance Cognitive Policy Summary</h2>
            <p>Congratulations! Your cognitive potential is now protected.</p>

            <div class="policy-summary-details">
                <div class="detail-item">
                    <strong>Your Registered CPS:</strong> <span>{{ initialData.cps }}/100</span>
                </div>
                <div class="detail-item">
                    <strong>Selected Risks:</strong>
                    <ul v-if="initialData.selectedRisks && initialData.selectedRisks.length > 0">
                        <li v-for="risk in displaySelectedRisks" :key="risk">{{ risk }}</li>
                    </ul>
                    <span v-else>No specific risks selected.</span>
                </div>
                <div class="detail-item">
                    <strong>Geographic Risk Factor:</strong> <span :class="geoRiskClass">{{ capitalizeFirstLetter(initialData.geographicRiskFactor) }}</span>
                </div>
                <div class="detail-item estimated-premium-final">
                    <strong>Estimated Annual Premium:</strong> <span>{{ initialData.estimatedPremium }} USD / year</span>
                </div>
                <div class="policy-note">
                    <p>This is a sample summary. A full policy document would be generated with detailed terms and conditions.</p>
                </div>
            </div>

            <h3>Thank You for Exploring Mindsurance!</h3>
            <p class="final-cta">We are committed to securing and empowering your intellectual future.</p>

            <div class="next-steps-actions">
                <button @click="resetSimulation" class="secondary-btn">Start New Assessment</button>
                <button @click="showContactInfo">Contact Our Advisors</button>
            </div>
        </div>
    `,
    computed: {
        displaySelectedRisks() {
            const riskMap = {
                'loss_of_faculties': 'Loss of Mental Faculties (accidents, illness)',
                'unauthorized_use': 'Unauthorized Use or Reproduction of Early Ideas',
                'delayed_realization': 'Delay in Realization or Suppression of Inventive Output'
            };
            if (!this.initialData || !this.initialData.selectedRisks) {
                return [];
            }
            return this.initialData.selectedRisks.map(risk => riskMap[risk] || risk);
        },
        geoRiskClass() {
            if (!this.initialData || !this.initialData.geographicRiskFactor) return '';
            return `risk-${this.initialData.geographicRiskFactor}`;
        }
    },
    methods: {
        capitalizeFirstLetter(string) { // Helper for display
            if (typeof string !== 'string' || string.length === 0) return '';
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        resetSimulation() {
            this.$emit('navigate', 'welcome', null);
        },
        showContactInfo() {
            alert("For more details or to formalize your policy, please contact our advisors at info@mindsurance.com or call +1 (123) 456-7890.");
        }
    }
};


// --- Main Vue application ---
const app = Vue.createApp({
    data() {
        return {
            currentScreen: 'welcome',
            cognitiveData: null
        };
    },
    components: {
        WelcomeScreen,
        DataInputScreen,
        AiAnalysisScreen,
        GeographicalRiskAssessmentScreen,
        BlockchainRegistrationScreen,
        CognitiveInsurancePolicySelectionScreen,
        SamplePolicyScreen
    },
    computed: {
        currentScreenComponent() {
            switch (this.currentScreen) {
                case 'welcome':
                    return 'WelcomeScreen';
                case 'dataInput':
                    return 'DataInputScreen';
                case 'aiAnalysis':
                    return 'AiAnalysisScreen';
                case 'geographicalRiskAssessment':
                    return 'GeographicalRiskAssessmentScreen';
                case 'blockchainRegistration':
                    return 'BlockchainRegistrationScreen';
                case 'cognitiveInsurance':
                    return 'CognitiveInsurancePolicySelectionScreen';
                case 'samplePolicy':
                    return 'SamplePolicyScreen';
                default:
                    return 'WelcomeScreen';
            }
        }
    },
    methods: {
        navigateTo(screenName, data = null) {
            this.currentScreen = screenName;
            this.cognitiveData = data;
            console.log("Navigating to:", screenName, "with data:", this.cognitiveData);
        }
    }
});

app.mount('#app');