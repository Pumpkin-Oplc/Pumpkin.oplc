extends TextureButton

func _ready():
	pressed.connect(tirarlost)
	
func tirarlost():
	get_parent().visible = false
