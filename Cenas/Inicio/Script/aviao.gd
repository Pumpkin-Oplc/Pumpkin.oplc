extends Sprite2D

@export var velocidade := 2.0  # velocidade do movimento
@export var amplitude := 50.0  # altura máxima que sobe/desce

var base_y := 0.0
var t := 0.0

func _ready():
	base_y = position.y

func _process(delta):
	t += delta * velocidade
	position.y = base_y + sin(t) * amplitude
