#!/usr/bin/python3
# coding: utf-8

from copy import deepcopy
import json
from math import floor, ceil
from time import sleep
from threading import Thread


from mouse import Mouse  # class that stores mouse movement sum

m_file = open("/dev/input/mouse3", "rb")
file_pos = open("../src/json/pos.json", "r+")
file_map = open("../src/json/map.json", "r+")
file_map_pattern = ''

m = Mouse(m_file)


def running_mouse_loop():
    '''sum loop of mouse.value'''
    m.mouse_displacement_sum()


def server_opts(action=''):
    '''It suppose to be function for closing threads to make all files.close()'''
    while True:
        action = input("Write: [0] to get status of mouse, [1] to finish program: ")
        print(type(action))
        if action == 0:
            print(m.mouse_pos())
        elif action == 1:
            close_file = open("../src/json/close_state.json", "w")
            close_file.write(json.dumps([True]))
            close_file.close()
            print("--" * 10)
            print("closing")
            break


def show_mouse_pos(file_pos, file_map):
    '''It reads from Mouse class and create position list of robot,
       and save it into map.json and pos in pos.json'''
    new_pos = [0, 0]
    old_pos = [0, 0]
    saved = False
    data_map = map_pattern()

    while True:
        if saved:
            file_pos = open("../src/json/pos.json", "r+")
            file_map = open("../src/json/map.json", "r+")
            saved = False
        '''In fact that our m.mouse_pos recieve pos that can be negative'''
        '''so, the (0,0) point will be always in the middle of python list'''

        data_pos = json.loads(m.mouse_pos())
        # data_map = json.loads(file_map.read().replace('\n', ''))
        new_pos[0], new_pos[1] = data_pos['x'], data_pos['y']

        if new_pos != old_pos:
            '''start update pos if they changed'''
            old_pos_fixed = get_pos_fix(old_pos, len(data_map), len(data_map[0]))

            data_map[old_pos_fixed[0]][old_pos_fixed[1]] = 1

        new_pos_fixed = get_pos_fix(new_pos, len(data_map), len(data_map[0]))

        if new_pos_fixed[0] <= 0 or new_pos_fixed[1] <= 0:
            for i in range(len(data_map)):
                data_map[i] += [0] * 10
            data_map += [[0 for x in range(len(data_map[0]))] for y in range(10)]

        if new_pos_fixed[0] >= len(data_map) or new_pos_fixed[1] >= len(data_map[0]):
            for i in range(len(data_map)):
                data_map[i] += [0] * 10
            data_map += [[0 for x in range(len(data_map[0]))] for y in range(10)]

        if new_pos != old_pos:
            '''end update pos if they changed'''
            print("len(data_map): ", len(data_map), "len(data_map[0]): ", len(data_map[0]))
            print(new_pos_fixed)

            new_pos_fixed = get_pos_fix(new_pos, len(data_map), len(data_map[0]))
            data_map[new_pos_fixed[0]][new_pos_fixed[1]] = 3

            '''end loop file operations'''
            file_pos.seek(0)
            file_pos.truncate()
            pos_str = "{\"x\": " + str(new_pos_fixed[0]) + ", \"y\": " + str(new_pos_fixed[1]) + "}"
            file_pos.write(pos_str)

            file_map.seek(0)
            file_map.truncate()
            file_map.write(json.dumps(data_map))

            file_pos.close()
            file_map.close()
            saved = True
            # sleep(1)
            old_pos[0], old_pos[1] = new_pos[0], new_pos[1]
            '''------------------------'''

        # sleep(0.1)
        # close_file = open("/var/www/html/py/close_state.json", "r")
        # tmp = close_file.read()
        # server_state = json.loads(tmp)
        # print(server_state)
        # close_file.close()
        # if server_state:
        #     print("--" * 10)
        #     print("show_mouse_pos -- Closing!")
        #     file_pos.close()
        #     file_map.close()
        #
        #     sleep(5)
        #     close_file = open("/var/www/html/py/close_state.json", "w")
        #     close_file.write(json.dumps([True]))
        #     close_file.close()
        #     t1.join()
        #     break


def map_pattern():
    '''Initial map pattern list'''
    file_map_pattern = open("../src/json/map_pattern.json", "r+")
    # file_map_pattern.close()
    return json.loads(file_map_pattern.read().replace('\n', ''))


def get_pos_fix(pos, x, y, pos_fix=[0, 0]):
    '''Becouse mouse have negative positions, we have to rescale positions to real list values'''
    pos_fix[0] = int(pos[0] + ceil((x - 1) / 2))
    pos_fix[1] = int(pos[1] + ceil((y - 1) / 2))
    return pos_fix

t1 = Thread(target=running_mouse_loop, args=[])
t2 = Thread(target=show_mouse_pos, args=[file_pos, file_map])
# t3 = Thread(target=server_opts, args=[])
t1.start()
t2.start()
# t3.start()
# m_file.close()
# file_pos.close()
# file_map.close()
