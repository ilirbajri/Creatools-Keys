
namespace VuMeter
{
	/** Creates a peak meter.
	*
	*	Usage: Give it a reference to a module (either synth or effect).
	*
	*	It looks best using a width and height with multiple of 4.
	*	Customize the colours using the scriptPanel colour Ids
	*/
	inline function createVuMeter(name, x, y)
	{
		local widget = Content.getComponent(name);
    
		Content.setPropertiesFromJSON(name, {
		"width": 34,
		"height": 620,
		"itemColour": 0xFFFF6A00,
		"itemColour2": 0xFF353535,
		"bgColour": 0xFF353535,
		"textColour": 4283782485,
		"saveInPreset": false,
		"opaque": 0
		});
    	
		widget.setPaintRoutine(function(g)
		{
			g.fillAll(this.get("bgColour"));
			
			g.setColour(this.get("itemColour"));
    	
			var lsize = parseInt(this.data.lvalue * (this.getHeight()-10));
			var rsize = parseInt(this.data.rvalue * (this.getHeight()-10));
    	
			g.fillRect([4, this.getHeight() - lsize - 1, (this.getWidth()-4)/2-1, lsize]);
			g.fillRect([2 + this.getWidth() / 2 - 1, this.getHeight() - rsize - 2, (this.getWidth()-4)/2-1, rsize]);
    	
			g.setColour(this.get("itemColour2"));
    	
			for(i = 1; i < this.getHeight()-1; i = i + 10)
			{
				g.fillRect([1, i, this.getWidth()-1, 8]);
			}
		});
    
		widget.setTimerCallback(function()
		{
			var lvalue;
			var rvalue;
			
			if(this.data.fx)
			{
				lvalue = getNormalizedPeakValue(this.data.fx.getCurrentLevel(0));
				rvalue = getNormalizedPeakValue(this.data.fx.getCurrentLevel(1));
			}
			else
			{
				lvalue = getNormalizedPeakValue(Engine.getMasterPeakLevel(0));
				rvalue = getNormalizedPeakValue(Engine.getMasterPeakLevel(1));
			}
			
			
    	
			this.data.lvalue = Math.max(lvalue, this.data.lvalue - 2.8);
			this.data.rvalue = Math.max(rvalue, this.data.rvalue - 2.8);
    	
			this.repaintImmediately();
		});
    
		widget.startTimer(30);
		return widget;
	};

	inline function setModule(vuMeter, module)
	{
		vuMeter.data.fx = module;
	}
	
	inline function getNormalizedPeakValue(gain)
	{
		return 0.014 * (74.0 + Engine.getDecibelsForGainFactor(gain));
	}
}