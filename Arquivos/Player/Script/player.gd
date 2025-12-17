extends CharacterBody2D

const GRAVITY_MULT = 0.6
@export var velocidade_pulo := 275.0
@export var max_rotacao := 30
@export var suavidade_rot := 0.1

func _ready():
	pass
func _physics_process(delta):
	if not is_on_floor():
		velocity += get_gravity() * GRAVITY_MULT * delta

	move_and_slide()

	var rot_ratio = clamp(velocity.y / velocidade_pulo, -1, 1)
	rotation_degrees += (rot_ratio * max_rotacao - rotation_degrees) * suavidade_rot

	for i in range(get_slide_collision_count()):
		var col = get_slide_collision(i)
		if col.collider.is_in_group("morte"):
			call_deferred("_trocar_cena")

func _input(event):
	if event.is_action_pressed("Pular"):
		velocity.y = -velocidade_pulo
