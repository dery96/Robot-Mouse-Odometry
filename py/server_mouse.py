#!/usr/bin/python3
# coding: utf-8

from threading import Thread
from math import floor, ceil
from time import sleep
import numpy as np
import json
import codecs

from mouse import Mouse  # class that stores mouse movement sum

m_file = open("/dev/input/mouse1", "rb")
file_pos = open("../src/json/pos.json", "r+")
file_map = open("../src/json/map.json", "r+")
file_map_pattern = ''

m = Mouse(m_file)


def running_mouse_loop():
    '''sum loop of mouse.value'''
    m.mouse_displacement_sum()


def get_one_pos_fixed(pos, length):
    '''Repair only one specific pos'''
    if pos >= 0:
        return pos
    elif pos < 0:
        return length + pos


def get_pos_in_array(x_len, y_len, pos_fix=[0, 0]):
    '''Return x, y pos fixed in array'''
    pos_fix[0] = get_one_pos_fixed(pos_fix[0], x_len)
    pos_fix[1] = get_one_pos_fixed(pos_fix[1], y_len)
    return pos_fix


def show_mouse_pos(file_pos, file_map):
    '''It read from Mouse class and create position list of robot,
       and save it into map.json and pos in pos.json'''
    data_map = map_pattern()
    new_pos = [0, 0]
    old_pos = [0, 0]
    saved = False

    extend_map_rate = 4 * 10  # how much cols or rows data_map will extend
    extend_margin = 3  # how close to border robot must be for list extend

    while True:
        if saved:
            file_pos = open("../src/json/pos.json", "r+")
            file_map = open("../src/json/map.json", "r+")
            saved = False

        data_pos = json.loads(m.mouse_pos())
        # data_map = json.loads(file_map.read().replace('\n', '')) # If use map from previous session

        new_pos[0], new_pos[1] = data_pos['x'], data_pos['y']

        if new_pos != old_pos:
            '''start update pos if they changed'''
            old_pos_fixed = get_pos_in_array(len(data_map), len(data_map[0]), old_pos)
            data_map[old_pos_fixed[0]][old_pos_fixed[1]] = 1

        new_pos_fixed = get_pos_in_array(len(data_map), len(data_map[0]), new_pos)

        length_x = int(len(data_map) / 2)
        length_y = int(len(data_map[0]) / 2)

        if type(data_map) is list:
            data_map = np.array(data_map)

        if new_pos_fixed[0] == length_x - extend_margin or new_pos_fixed[0] == length_x + extend_margin:
            data_map_part_down = data_map[length_x:, :]
            data_map_part_up = np.pad(data_map[:length_x, :], ((0, extend_map_rate), (0, 0)),
                                      mode='constant', constant_values=0)

            data_map = np.concatenate((data_map_part_up, data_map_part_down), axis=0)

        if new_pos_fixed[1] == length_y - extend_margin or new_pos_fixed[1] == length_y + extend_margin:
            data_map_part_right = data_map[:, length_y:]
            data_map_part_left = np.pad(data_map[:, :length_y], ((0, 0), (0, extend_map_rate)),
                                        mode='constant', constant_values=0)
            data_map = np.concatenate((data_map_part_left, data_map_part_right), axis=1)

        if new_pos != old_pos:
            # print(new_pos)

            '''finish update process'''
            new_pos_fixed = get_pos_in_array(len(data_map), len(data_map[0]), new_pos)
            data_map[new_pos_fixed[0]][new_pos_fixed[1]] = 3
            '''end loop file operations'''
            file_pos.seek(0)
            file_pos.truncate()
            pos_str = "{\"x\": " + str(new_pos_fixed[0]) + ", \"y\": " + str(new_pos_fixed[1]) + "}"
            file_pos.write(pos_str)

            file_map.seek(0)
            file_map.truncate()

            if type(data_map) is not list:
                data_map = data_map.tolist()

            file_map.write(json.dumps(data_map))

            file_pos.close()
            file_map.close()

            saved = True
        old_pos[0], old_pos[1] = new_pos[0], new_pos[1]


def map_pattern():
    '''Initial map pattern list'''
    file_map_pattern = open("../src/json/map_pattern.json", "r+")
    # file_map_pattern.close()
    return json.loads(file_map_pattern.read().replace('\n', ''))


t1 = Thread(target=running_mouse_loop, args=[])
t2 = Thread(target=show_mouse_pos, args=[file_pos, file_map])

t1.start()
t2.start()
