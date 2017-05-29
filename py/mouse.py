#!/usr/bin/python3
# coding: utf-8

import struct
import os.path


class Mouse(object):
    '''It gets access to mouse raw_data and make sum of displacement in while loop'''

    def __init__(self, mouse_file):
        self.file = mouse_file
        self.state = False

        self.mouse_value = 0
        self.mouse_action_sum = [0, 0]
        self.square_size = 5  # cm size of one square in list

        self.x_move = 0
        self.y_move = 0

    def mouse_pos(self):
        '''returns json object of x,y position'''
        return ("{\"x\": %d, \"y\": %d}" % (int(self.x_move / 5), int(self.y_move / 5)))

    def get_mouse_event(self):
        '''read raw_mouse file data given'''
        buf = self.file.read(3)
        x, y = struct.unpack("bb", buf[1:])
        return x, y

    def mouse_displacement_sum(self, dpi=3):
        '''dpi:
            1: 450 dpi
            2: 900 dpi
            3: 1800 dpi'''

        while(True):
            self.mouse_value = self.get_mouse_event()
            # print(self.mouse_pos)

            self.mouse_action_sum[0] += self.mouse_value[0]
            self.mouse_action_sum[1] += self.mouse_value[1]

            #  (mouse_action_sum / mouse_dpi) = [mouse_displacement_sum] in [inches!],
            #   so sum * 2.54 = sum in [cm]

            self.x_move = (self.mouse_action_sum[0] / (dpi * 450.)) * 2.54
            self.y_move = (self.mouse_action_sum[1] / (dpi * 450.)) * 2.54

            if self.state:
                print("--" * 10)
                print("mouse_displacement_sum -- Closing!")
                break

            print("x: %d [cm], y: %d [cm]" % (self.x_move / self.square_size, self.y_move / self.square_size))
            # print("robot_position_square:[%d][%d]" % (self.x_move / 25, self.y_move / 25))

        file.close()

# file = open("/dev/input/mouse3", "rb")
# m = Mouse(file)
# m.mouse_displacement_sum()
# print(m)
