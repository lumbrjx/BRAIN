Predict Machines Failure
===
## Overview
This repository contains a project aimed at predicting machine failures using sensor data. The goal is to classify whether a machine is likely to fail based on features such as temperature, vibration, and other operational indicators. This project can be used for predictive maintenance, helping to detect potential failures early and prevent costly downtime



## Install & Dependence
  - numpy==1.26.4
  - pandas==1.4.3
  - matplotlib==3.5.2
torch
Flask==2.3.2



## Use
- for train
  ```
  python Ai/Training/train.py
  ```
- for Hosting
  ```
  python Ai/Host.py
  ```
## Pretrained model
| Model | accuracy |Download |
| ---    |  ---| ---   |
| Model-1 | 0.93   |  [download](https://github.com/lumbrjx/BRAIN/blob/main/Ai/model/acc_0.92_weights.pt) |
| Model-2 |  0.92  | [download](https://github.com/lumbrjx/BRAIN/blob/main/Ai/model/acc_0.93_weights.pt) |


## Directory Hierarchy
```
|—— Ai.mkv
|—— Host.py
|—— Machines_2
|    |—— data.csv
|—— model
|    |—— acc_0.92_weights.pt
|    |—— acc_0.93_weights.pt
|—— requirements.txt
|—— testapi.py
|—— Training
|    |—— dataset.py
|    |—— model.py
|    |—— Train.py
|    |—— utils.py
|    
```
