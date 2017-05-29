'''Simple list generator for check if drawing map by canvas work'''

from random import randint

robot_position = []
robot_position_tmp = []
signs_set = ['w', 'e', 'p']

for i in range(19):
    for j in range(19):
        robot_position_tmp.append(0)
    robot_position.append(robot_position_tmp)
    robot_position_tmp = []

print robot_position


file = open('mapped_positions.txt', 'w')
file.write(str(robot_position))

# for i in robot_position:
#     tmp = str(i[0]) + ", " + str(i[1]) + ", " + str(i[2]) + "\n"
#     file.write(tmp)
