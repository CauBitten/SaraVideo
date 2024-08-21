.data
msg_len: .asciiz "Digite o comprimento do array (>= 8): "
msg_invalid: .asciiz "N inválido\n"
msg_input: .asciiz "Digite os elementos do array:\n"
msg_x: .asciiz "Vetor de entrada x:\n"
msg_y: .asciiz "Vetor de saída y:\n"
newline: .asciiz "\n"

.text
.globl main

main:
    # Solicita comprimento do array
    la $a0, msg_len       # Carrega endereço da mensagem
    li $v0, 4             # Código de sistema para print string
    syscall               # Imprime a mensagem

    li $v0, 5             # Código de sistema para ler inteiro
    syscall               # Lê o comprimento do array
    move $t0, $v0         # Salva o comprimento em $t0

    blt $t0, 8, invalid   # Se N < 8, vai para a etiqueta 'invalid'

    # Aloca memória para o array de entrada x
    sll $t1, $t0, 2       # Calcula N * 4 (tamanho em bytes)
    li $v0, 9             # Código de sistema para sbrk
    move $a0, $t1         # Tamanho do bloco de memória
    syscall               # Aloca memória
    move $s0, $v0         # Salva o ponteiro base do array x

    # Aloca memória para o array de saída y (N-7)
    sub $t2, $t0, 7       # Calcula N - 7
    sll $t3, $t2, 2       # Calcula (N-7) * 4 (tamanho em bytes)
    li $v0, 9             # Código de sistema para sbrk
    move $a0, $t3         # Tamanho do bloco de memória
    syscall               # Aloca memória
    move $s1, $v0         # Salva o ponteiro base do array y

    # Solicita elementos do array x
    la $a0, msg_input     # Carrega endereço da mensagem
    li $v0, 4             # Código de sistema para print string
    syscall               # Imprime a mensagem

    li $t4, 0             # Inicializa índice i = 0
input_loop:
    bge $t4, $t0, calc_y  # Se i >= N, vai para a etiqueta 'calc_y'

    li $v0, 5             # Código de sistema para ler inteiro
    syscall               # Lê o elemento
    sll $t5, $t4, 2       # Calcula o offset i * 4
    add $t6, $s0, $t5     # Calcula o endereço x[i]
    sw $v0, 0($t6)        # Salva o elemento no array x

    addi $t4, $t4, 1      # Incrementa i
    j input_loop          # Volta para o início do loop

invalid:
    la $a0, msg_invalid   # Carrega endereço da mensagem
    li $v0, 4             # Código de sistema para print string
    syscall               # Imprime a mensagem
    j main                # Reinicia o programa

calc_y:
    li $t4, 0             # Inicializa índice i = 0
calc_y_loop:
    bge $t4, $t2, print_x  # Se i >= (N-7), vai para a etiqueta 'print_x'

    li $t7, 0             # Inicializa soma = 0
    li $t8, 0             # Inicializa j = 0
sum_loop:
    bge $t8, 8, div_sum   # Se j >= 8, vai para a etiqueta 'div_sum'

    add $t9, $t4, $t8     # Calcula i + j
    sll $t5, $t9, 2       # Calcula (i+j) * 4
    add $t6, $s0, $t5     # Calcula o endereço x[i+j]
    lw $t2, 0($t6)        # Carrega x[i+j]
    add $t7, $t7, $t2     # soma += x[i+j]

    addi $t8, $t8, 1      # Incrementa j
    j sum_loop            # Volta para o início do loop

div_sum:
    li $t9, 8             # Constante 8
    div $t7, $t9          # Calcula soma / 8
    mflo $t7              # Move o resultado para $t7

    sll $t5, $t4, 2       # Calcula o offset i * 4
    add $t6, $s1, $t5     # Calcula o endereço y[i]
    sw $t7, 0($t6)        # Salva y[i]

    addi $t4, $t4, 1      # Incrementa i
    j calc_y_loop         # Volta para o início do loop

print_x:
    la $a0, msg_x         # Carrega endereço da mensagem
    li $v0, 4             # Código de sistema para print string
    syscall               # Imprime a mensagem

    li $t4, 0             # Inicializa índice i = 0
print_x_loop:
    bge $t4, $t0, print_y # Se i >= N, vai para a etiqueta 'print_y'

    sll $t5, $t4, 2       # Calcula o offset i * 4
    add $t6, $s0, $t5     # Calcula o endereço x[i]
    lw $a0, 0($t6)        # Carrega x[i]
    li $v0, 1             # Código de sistema para print integer
    syscall               # Imprime x[i]

    la $a0, newline       # Carrega endereço da nova linha
    li $v0, 4             # Código de sistema para print string
    syscall               # Imprime nova linha

    addi $t4, $t4, 1      # Incrementa i
    j print_x_loop        # Volta para o início do loop

print_y:
    la $a0, msg_y         # Carrega endereço da mensagem
    li $v0, 4             # Código de sistema para print string
    syscall               # Imprime a mensagem

    li $t4, 0             # Inicializa índice i = 0
print_y_loop:
    bge $t4, $t2, end     # Se i >= (N-7), vai para a etiqueta 'end'

    sll $t5, $t4, 2       # Calcula o offset i * 4
    add $t6, $s1, $t5     # Calcula o endereço y[i]
    lw $a0, 0($t6)        # Carrega y[i]
    li $v0, 1             # Código de sistema para print integer
    syscall               # Imprime y[i]

    la $a0, newline       # Carrega endereço da nova linha
    li $v0, 4             # Código de sistema para print string
    syscall               # Imprime nova linha

    addi $t4, $t4, 1      # Incrementa i
    j print_y_loop        # Volta para o início do loop

end:
    li $v0, 10            # Código de sistema para sair do programa
    syscall               # Sai do programa

