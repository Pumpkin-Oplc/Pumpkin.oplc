extends TextureButton

@export var cena_alvo: String = "res://Cenas/Game/Game.tscn"

func _ready():
	pressed.connect(_trocar_cena)

func _trocar_cena():
	get_tree().change_scene_to_file(cena_alvo)
