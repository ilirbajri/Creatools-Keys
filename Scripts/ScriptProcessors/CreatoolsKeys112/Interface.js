Content.makeFrontInterface(880, 660);

/*
	MIT License

	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this file, to deal in the Software without restriction, including without
	limitation the rights	to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell	copies of the Software, and to permit
	persons to whom the Software is	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

Engine.loadFontAs("{PROJECT_FOLDER}Cabin-Regular.ttf", "Cabin-Regular");
Engine.loadFontAs("{PROJECT_FOLDER}Cabin-Bold.ttf", "Cabin-Bold");
Engine.loadFontAs("{PROJECT_FOLDER}LeagueGothic-Regular.ttf", "LeagueGothic-Regular");
Engine.setGlobalFont("Cabin-Bold");

// VU METER

		include("VuMeter.js");
		
	const var v1 = VuMeter.createVuMeter("VuMeter", 0, 0);
		VuMeter.setModule(v1, Synth.getEffect("Volume"));


// MAIN PANELS SETUP

	const var NUM_BUTTONS = 5;
	const var buttons = [];
	const var panels = [];

		for (i = 0; i < NUM_BUTTONS; i++)
		{
			buttons[i] = Content.getComponent("Button" + (i+1));
			panels[i] = Content.getComponent("Panel" + (i+1));
			buttons[i].setControlCallback(onButtonControl);
		}

		inline function onButtonControl(component, value)
		{
			local idx = buttons.indexOf(component);
	
			for (i = 0; i < panels.length; i++)
		{
    		panels[i].showControl(idx == i);
		}
		}  


	// Show Preset Name

const var PresetName = Content.getComponent("PresetName");

	inline function onPHKnobControl(component, value)
	{
		if (Engine.getCurrentUserPresetName() == "")
    	Content.getComponent("PresetName").set("text", "Init");
		else
    	Content.getComponent("PresetName").set("text", Engine.getCurrentUserPresetName());
	};

	Content.getComponent("PHKnob").setControlCallback(onPHKnobControl);

	// Prev and Next Preset Buttons
	
Content.getComponent("NextBtn").setControlCallback(onNextBtnControl);
	inline function onNextBtnControl(component, value)
	{
		if(value == 1)    
		Engine.loadNextUserPreset(false);
	};
		Content.getComponent("PrevBtn").setControlCallback(onPrevBtnControl);
		inline function onPrevBtnControl(component, value)
	{
		if(value == 1)   
		Engine.loadPreviousUserPreset(false);
	};


// Comvolution String Resonance Setup

	Engine.loadAudioFilesIntoPool();

	const Resonance = Synth.getAudioSampleProcessor("Resonance");
	const Impulse1 = Content.getComponent("Impulse1");
	const var Select2 = ["Electric 1", "Electric 2", "Electric 3", "Digital 1","Digital 2","Digital 3","String 1","String 2","String 3","String 4","Metallic","Chordophone 1","Chordophone 2","Chordophone 3","Tubes 1"];

	Impulse1.set("items", Select2.join("\n"));   

	inline function onImpulse1Control(component, value)
	{
	Resonance.setFile("{PROJECT_FOLDER}" + Select2[value - 1] + ".wav");
	};

	Content.getComponent("Impulse1").setControlCallback(onImpulse1Control);

// PITCHSHIFT RATIO SETUP
    
	const var PITCHSHIFT = Synth.getModulator("E1 Pitch Shift Modulator");

		inline function onE1_PitchShiftControl(component, value)
		{
			PITCHSHIFT.setIntensity(value/2);	
		};

	Content.getComponent("E1_PitchShift").setControlCallback(onE1_PitchShiftControl);

// Setup samplemap comboboxes

	// E1 samplemaps

	const var E1 = Synth.getChildSynth("E1Sampler");
	const var sampleMaps1 = Sampler.getSampleMapList();

	const var Element1 = Content.getComponent("E1SampleMap");
	Element1.set("items", sampleMaps1.join("\n"));

		inline function onElement1Control(component, value)
		{
			E1.asSampler().loadSampleMap(sampleMaps1[value-1]);
		};

	Content.getComponent("E1SampleMap").setControlCallback(onElement1Control);

	// E2 samplemaps

	const var E2 = Synth.getChildSynth("E2Sampler");
	const var sampleMaps2 = Sampler.getSampleMapList();

	const var Element2 = Content.getComponent("E2SampleMap");
	Element2.set("items", sampleMaps2.join("\n"));

		inline function onElement2Control(component, value)
		{
			E2.asSampler().loadSampleMap(sampleMaps2[value-1]);
		};

	Content.getComponent("E2SampleMap").setControlCallback(onElement2Control);

	// E3 samplemaps

	const var E3 = Synth.getChildSynth("E3Sampler");
	const var sampleMaps3 = Sampler.getSampleMapList();

	const var Element3 = Content.getComponent("E3SampleMap");
	Element3.set("items", sampleMaps3.join("\n"));

		inline function onElement3Control(component, value)
		{
			E3.asSampler().loadSampleMap(sampleMaps3[value-1]);
		};

	Content.getComponent("E3SampleMap").setControlCallback(onElement3Control);


// Filter comboboxes setup

// Global Filter

	const var G_Filter = Synth.getEffect("Global Filter");
	const var modes = {"SV lowpass": 6, "SV highpass": 7, "B4 lowpass": 0, "B4 highpass": 1, "Rez lowpass": 5, "4P ladder": 15, "Allpass": 14, "Ring mod.": 17, "Low shelf": 2, "High shelf": 3, "Peak EQ": 4,};
	const var G1FilterMode = Content.getComponent("G1FilterType");
	G1FilterMode.set("items", ""); //Clear list

		for (k in modes)
		{
    		G1FilterMode.addItem(k); //Add mode name to list
		}

		inline function onG1FilterModeControl(component, value)
		{
    		G_Filter.setAttribute(G_Filter.Mode, modes[component.getItemText()]);
		};

	Content.getComponent("G1FilterType").setControlCallback(onG1FilterModeControl);

	// E1 Filter

	const var E1_Filter = Synth.getEffect("E1 Filter");
	const var modes1 = {"1P lowpass": 9, "1P highpass": 10, "SV lowpass": 6, "SV highpass": 7, "B4 lowpass": 0, "B4 highpass": 1, "Rez lowpass": 5, "4P ladder": 15, "Allpass": 14};
	const var E1FilterMode = Content.getComponent("E1FilterType");
	E1FilterMode.set("items", ""); //Clear list

		for (k in modes1)
		{
    		E1FilterMode.addItem(k); //Add mode name to list
		}

		inline function onE1FilterModeControl(component, value)
		{
    		E1_Filter.setAttribute(E1_Filter.Mode, modes1[component.getItemText()]);
		};

	Content.getComponent("E1FilterType").setControlCallback(onE1FilterModeControl);

	// E2 Filter

	const var E2_Filter = Synth.getEffect("E2 Filter");
	const var modes2 = {"1P lowpass": 9, "1P highpass": 10, "SV lowpass": 6, "SV highpass": 7, "B4 lowpass": 0, "B4 highpass": 1, "Rez lowpass": 5, "4P ladder": 15, "Allpass": 14};
	const var E2FilterMode = Content.getComponent("E2FilterType");
	E2FilterMode.set("items", ""); //Clear list

		for (k in modes2)
		{
    		E2FilterMode.addItem(k); //Add mode name to list
		}

		inline function onE2FilterModeControl(component, value)
		{
   		 	E2_Filter.setAttribute(E2_Filter.Mode, modes2[component.getItemText()]);
		};

	Content.getComponent("E2FilterType").setControlCallback(onE2FilterModeControl);

	// E3 Filter

	const var E3_Filter = Synth.getEffect("E3 Filter");
	const var modes3 = {"1P lowpass": 9, "1P highpass": 10, "SV lowpass": 6, "SV highpass": 7, "B4 lowpass": 0, "B4 highpass": 1, "Rez lowpass": 5, "4P ladder": 15, "Allpass": 14};
	const var E3FilterMode = Content.getComponent("E3FilterType");
	E3FilterMode.set("items", ""); //Clear list

		for (k in modes3)
		{
    		E3FilterMode.addItem(k); //Add mode name to list
		}

		inline function onE3FilterModeControl(component, value)
		{
    		E3_Filter.setAttribute(E3_Filter.Mode, modes3[component.getItemText()]);
		};

	Content.getComponent("E3FilterType").setControlCallback(onE3FilterModeControl);

// Tremolo control

const var TremoloPan = Content.getComponent("TremoloPan");
const var E1Tremolo = Content.getComponent("E1Tremolo");;
const var E2Tremolo = Content.getComponent("E2Tremolo");
const var E3Tremolo = Content.getComponent("E3Tremolo");

const var trmod1 = Synth.getModulator("trmod1");
const var trmod2 = Synth.getModulator("trmod2");
const var trmod3 = Synth.getModulator("trmod3");

inline function onTremoloPanControl(component, value)
{
	E1Tremolo.setValue(value);
	E2Tremolo.setValue(value);
	E3Tremolo.setValue(value);
	E1Tremolo.changed();
	E2Tremolo.changed();
	E3Tremolo.changed();
};

Content.getComponent("TremoloPan").setControlCallback(onTremoloPanControl);

// LFO Editors

	        // LFO1 EDIT WINDOW
	        
	        const var LFO1Edit = Content.getComponent("LFO1Edit");
	        const var LFO1EditButton = Content.getComponent("LFO1EditButton");
	        LFO1EditButton.setControlCallback(LFO1EditButtonCB);
	
	        inline function LFO1EditButtonCB(control, value)
	        {
	            LFO1Edit.showControl(value);
	        }
	
			// LFO2 EDIT WINDOW
	        
	        const var LFO2Edit = Content.getComponent("LFO2Edit");
	        const var LFO2EditButton = Content.getComponent("LFO2EditButton");
	        LFO2EditButton.setControlCallback(LFO2EditButtonCB);
	
	        inline function LFO2EditButtonCB(control, value)
	        {
	            LFO2Edit.showControl(value);
	        }
	
			// LFO3 EDIT WINDOW
			       
			const var LFO3Edit = Content.getComponent("LFO3Edit");
			const var LFO3EditButton = Content.getComponent("LFO3EditButton");
			LFO3EditButton.setControlCallback(LFO3EditButtonCB);
			
			inline function LFO3EditButtonCB(control, value)
			{
			    LFO3Edit.showControl(value);
			}
			
			
			// LFO4 EDIT WINDOW
			        
			const var LFO4Edit = Content.getComponent("LFO4Edit");
			const var LFO4EditButton = Content.getComponent("LFO4EditButton");
			LFO4EditButton.setControlCallback(LFO4EditButtonCB);
			
			inline function LFO4EditButtonCB(control, value)
			{
				LFO4Edit.showControl(value);
			}
			
	
// MODPANEL1 WINDOW
	        
	        const var ModPanel1 = Content.getComponent("ModPanel1");
	        const var ModPanel1Btn = Content.getComponent("ModPanel1Btn");
	        ModPanel1Btn.setControlCallback(ModPanel1BtnCB);
	
	        inline function ModPanel1BtnCB(control, value)
	        {
	            ModPanel1.showControl(value);
	        }	
	        
// MODPANEL2 WINDOW
	        
	        const var ModPanel2 = Content.getComponent("ModPanel2");
	        const var ModPanel2Btn = Content.getComponent("ModPanel2Btn");
	        ModPanel2Btn.setControlCallback(ModPanel2BtnCB);
	
	        inline function ModPanel2BtnCB(control, value)
	        {
	            ModPanel2.showControl(value);
	        }	
	        
	        function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()

{
Resonance.setAttribute(4, Synth.isSustainPedalDown() );	
}function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 