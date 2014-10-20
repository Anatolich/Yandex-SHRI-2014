/* equalizerJS - объект описывающий эквалайзер, его свойства и поведение
*
* Version: 0.01 Dev
*
*/

var equalizerJS = function(selector, timeout, colWidth, animationType)
{
	this.setEqualizer(selector, timeout, colWidth, animationType);
};

equalizerJS.prototype =
{
	// Объект узла в контексте которого будет работать эквалайзер

	equalizerNode: null,

	// Таймаут анимации сегментов, в мс

	equalizerAnimationTimeout: 1000,

	// Количество сегментов эквалайзера

	equalizerSegmentNum: 0,

	// Ширина сегмента эквалайзера

	equalizerSegmentWidth: 1,

	// Объект таймера основной анимации

	animationTimer: null,

	// Тип анимации, спад или рост

	animationType: 'down',

	// Максимально возможное время анимации одного сегмента

	segmentAnimationTime: 0,

	/**
	 * Конструктор объекта
	 *
	 * @param object selector	узел / элемент для интеграции эквалайзера
	 *
	 * @param integer timeout	таймаут анимации эквалайзера
	 *
	 * @param integer colWidth	желаемый размер сегмента эквалайзера
	 *
	 * @return void
	 *
	 */

	setEqualizer: function(selector, timeout, colWidth, animationType)
	{
		if(typeof selector === 'object' || selector.nodeType)
		{
			this.equalizerNode = selector;

			if(timeout !== undefined || typeof(timeout) === 'number')
			{
				this.equalizerAnimationTimeout = timeout;
			}

			if(colWidth !== undefined || typeof(colWidth) === 'number')
			{
				this.equalizerSegmentWidth = colWidth;
			}

			if(animationType == 'up')
			{
				this.animationType = this.equalizerNode.clientHeight;
			}

			else if(animationType == 'down')
			{
				this.animationType = this.equalizerNode.clientHeight / 2;
			}

			/* Расчет оптимального кол-ва сегментов эквалайзера */

			this.equalizerSegmentNum = Math.ceil(this.equalizerNode.clientWidth / this.equalizerSegmentWidth);

			/* Расчет максимального времени анимации одного сегмента */

			this.segmentAnimationTime = Math.ceil(this.equalizerAnimationTimeout / this.equalizerSegmentNum);

			/* Создаем сегменты эквалайзера */

			var cols = document.createDocumentFragment()

			for(var i = this.equalizerSegmentNum; i--;)
			{
				var col = document.createElement('span');

        		col.className = 'equalizer_cols';

        		col.style.width = this.equalizerSegmentWidth + 'px';

        		cols.appendChild(col);
			}

			this.equalizerNode.appendChild(cols);

			/* запуск полного цикла анимации, основной таймер */

			var self = this;

			this.animationTimer = setInterval(function() {self.runEqualizer();}, this.equalizerAnimationTimeout + 1110);		
		}
	},

	runEqualizer: function()
	{
		var cols = this.equalizerNode.getElementsByTagName('span');

		for(var i = cols.length; i--;)
		{
			var colHeight = Math.round(this.equalizerNode.clientHeight * Math.random());

			cols[i].style.height = colHeight + 'px';
		}

		for(var i = cols.length; i--;)
		{
			this.equalizerAnimation(cols[i]);
		}
	},

	equalizerAnimation: function(equalizer_segment)
	{
		var start_animation_step = equalizer_segment.clientHeight;

		if(start_animation_step === 0)	
		{
			start_animation_step = 1;
		}

		var end_animation_step = this.animationType;

		var animation_step = 1;

		/* этот участок предпологал, линейное изменение, вобщем участок должен отвечать на вопрос, 

		сколько px нужно прибавлять чтобы уложиться в заданный промежуток времени (НЕУСПЕЛ) */

		if(start_animation_step > end_animation_step)
		{
			//var animation_step = Math.ceil(start_animation_step / segment_animation_time);
		}

		else if(start_animation_step < end_animation_step)
		{
			//var animation_step = Math.ceil(start_animation_step / segment_animation_time) * end_animation_step;
		}

		var segment_timer = setInterval(function() {

			if(start_animation_step > end_animation_step)
			{
				start_animation_step = start_animation_step - animation_step;

				if(start_animation_step < end_animation_step)
				{
					start_animation_step = end_animation_step;
				}
			}

			else if(start_animation_step < end_animation_step)
			{
				start_animation_step = start_animation_step + animation_step;

				if(start_animation_step > end_animation_step)
				{
					start_animation_step = end_animation_step;
				}
			}

			equalizer_segment.style.height = start_animation_step + 'px';

			if(start_animation_step === end_animation_step)
    		{
    			clearInterval(segment_timer);
    		}

		}, this.segmentAnimationTime);

		/* здесь в сухом остатке, не удалось за отведенное время реализовать идею того, чтобы каждый сегмент, линейно отрабатывал свою анимацию в отведенное время,
		   слишком малы значения, не нашел зависимую переменную чтобы уложиться по кадрам анимации */
	}	
};