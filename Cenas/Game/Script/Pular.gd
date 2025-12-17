extends TextureButton

@export var caminho_jogador := NodePath("..../Player")

func _ready():
	self.pressed.connect(_on_pressed)

func _on_pressed():
	# Adiamos a execução para garantir que o botão esteja na árvore de cena
	call_deferred("_simular_pulo")

func _simular_pulo():
	var event = InputEventAction.new()
	event.action = "Pular"
	event.pressed = true
	Input.parse_input_event(event)

	var jogador = get_node_or_null(caminho_jogador)
	if jogador:
		jogador.pular()  # Substitua "pular()" pelo método real de pulo do seu jogador
