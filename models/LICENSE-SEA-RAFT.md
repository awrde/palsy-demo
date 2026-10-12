SEA-RAFT optical-flow model: models/searaft_M_512.onnx (research setting only)

Converted to ONNX by tools/bench/export_searaft.py from the authors' checkpoint
MemorySlices/Tartan-C-T-TSKH-spring540x960-M (https://huggingface.co/MemorySlices/Tartan-C-T-TSKH-spring540x960-M).
Code: https://github.com/princeton-vl/SEA-RAFT. Licence of the code and the checkpoint:

```
BSD 3-Clause License

Copyright (c) 2024, Princeton Vision & Learning Lab

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```

Training data, which the licence above does not cover (checked 2026-10-12): TartanAir (CC BY 4.0), then
FlyingChairs and FlyingThings3D (University of Freiburg: research purposes only, commercial use prohibited), then a
mix of MPI Sintel, KITTI (CC BY-NC-SA 3.0), HD1K and FlyingThings3D, then Spring (CC BY 4.0). The encoders start
from torchvision's ImageNet weights. This app loads the model only in the research setting
(설정 → 측정 방식 → SEA-RAFT 혼합), never in the default measurement; builds without the research tools leave it out
(vite.config.ts). Not for commercial use.
