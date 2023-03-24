/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import { TopK } from '@tensorflow/tfjs-core';
import { assertNotComplex } from '../cpu_util';
import { topKImpl } from './TopK_impl';
export function topK(args) {
    const { inputs, backend, attrs } = args;
    const { x } = inputs;
    const { k, sorted } = attrs;
    assertNotComplex(x, 'topk');
    const xVals = backend.data.get(x.dataId).values;
    const [allTopKVals, allTopKIndices] = topKImpl(xVals, x.shape, x.dtype, k, sorted);
    return [
        backend.makeTensorInfo(allTopKVals.shape, allTopKVals.dtype, allTopKVals.values),
        backend.makeTensorInfo(allTopKIndices.shape, allTopKIndices.dtype, allTopKIndices.values)
    ];
}
export const topKConfig = {
    kernelName: TopK,
    backendName: 'cpu',
    kernelFunc: topK
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9wSy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3RmanMtYmFja2VuZC1jcHUvc3JjL2tlcm5lbHMvVG9wSy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxPQUFPLEVBQXdELElBQUksRUFBb0MsTUFBTSx1QkFBdUIsQ0FBQztBQUdySSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUVyQyxNQUFNLFVBQVUsSUFBSSxDQUNoQixJQUFxRTtJQUV2RSxNQUFNLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUM7SUFDdEMsTUFBTSxFQUFDLENBQUMsRUFBQyxHQUFHLE1BQU0sQ0FBQztJQUNuQixNQUFNLEVBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBQyxHQUFHLEtBQUssQ0FBQztJQUUxQixnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFNUIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQW9CLENBQUM7SUFDOUQsTUFBTSxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsR0FDL0IsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUF3QixFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUVwRSxPQUFPO1FBQ0wsT0FBTyxDQUFDLGNBQWMsQ0FDbEIsV0FBVyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDN0QsT0FBTyxDQUFDLGNBQWMsQ0FDbEIsY0FBYyxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUM7S0FDdkUsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQWlCO0lBQ3RDLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLFVBQVUsRUFBRSxJQUE2QjtDQUMxQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge0tlcm5lbENvbmZpZywgS2VybmVsRnVuYywgTnVtZXJpY0RhdGFUeXBlLCBUZW5zb3JJbmZvLCBUb3BLLCBUb3BLQXR0cnMsIFRvcEtJbnB1dHMsIFR5cGVkQXJyYXl9IGZyb20gJ0B0ZW5zb3JmbG93L3RmanMtY29yZSc7XG5cbmltcG9ydCB7TWF0aEJhY2tlbmRDUFV9IGZyb20gJy4uL2JhY2tlbmRfY3B1JztcbmltcG9ydCB7YXNzZXJ0Tm90Q29tcGxleH0gZnJvbSAnLi4vY3B1X3V0aWwnO1xuaW1wb3J0IHt0b3BLSW1wbH0gZnJvbSAnLi9Ub3BLX2ltcGwnO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9wSyhcbiAgICBhcmdzOiB7aW5wdXRzOiBUb3BLSW5wdXRzLCBiYWNrZW5kOiBNYXRoQmFja2VuZENQVSwgYXR0cnM6IFRvcEtBdHRyc30pOlxuICAgIFtUZW5zb3JJbmZvLCBUZW5zb3JJbmZvXSB7XG4gIGNvbnN0IHtpbnB1dHMsIGJhY2tlbmQsIGF0dHJzfSA9IGFyZ3M7XG4gIGNvbnN0IHt4fSA9IGlucHV0cztcbiAgY29uc3Qge2ssIHNvcnRlZH0gPSBhdHRycztcblxuICBhc3NlcnROb3RDb21wbGV4KHgsICd0b3BrJyk7XG5cbiAgY29uc3QgeFZhbHMgPSBiYWNrZW5kLmRhdGEuZ2V0KHguZGF0YUlkKS52YWx1ZXMgYXMgVHlwZWRBcnJheTtcbiAgY29uc3QgW2FsbFRvcEtWYWxzLCBhbGxUb3BLSW5kaWNlc10gPVxuICAgICAgdG9wS0ltcGwoeFZhbHMsIHguc2hhcGUsIHguZHR5cGUgYXMgTnVtZXJpY0RhdGFUeXBlLCBrLCBzb3J0ZWQpO1xuXG4gIHJldHVybiBbXG4gICAgYmFja2VuZC5tYWtlVGVuc29ySW5mbyhcbiAgICAgICAgYWxsVG9wS1ZhbHMuc2hhcGUsIGFsbFRvcEtWYWxzLmR0eXBlLCBhbGxUb3BLVmFscy52YWx1ZXMpLFxuICAgIGJhY2tlbmQubWFrZVRlbnNvckluZm8oXG4gICAgICAgIGFsbFRvcEtJbmRpY2VzLnNoYXBlLCBhbGxUb3BLSW5kaWNlcy5kdHlwZSwgYWxsVG9wS0luZGljZXMudmFsdWVzKVxuICBdO1xufVxuXG5leHBvcnQgY29uc3QgdG9wS0NvbmZpZzogS2VybmVsQ29uZmlnID0ge1xuICBrZXJuZWxOYW1lOiBUb3BLLFxuICBiYWNrZW5kTmFtZTogJ2NwdScsXG4gIGtlcm5lbEZ1bmM6IHRvcEsgYXMgdW5rbm93biBhcyBLZXJuZWxGdW5jXG59O1xuIl19